"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Service } from "@/types/service";
import axios from "axios";
import { ContentState, convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface CardToMapService {
  category: string,
  title: string,
  src: string,
  content: React.JSX.Element,
  description: string,
}

export function Features() {
  const [services, setServices] = useState<Service[]>([]);
  const [cards_, setCards] = useState<CardToMapService[]>([]);
  const [editorStates, setEditorStates] = useState<Record<string, EditorState>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7192/service-management/services');
        const services: Service[] = response.data.results;

        setServices(services);

        const cardToMapServices = services.map(service => {
          let contentState;

          try {
            // Attempt to parse description as JSON
            contentState = service.description 
              ? convertFromRaw(JSON.parse(service.description)) 
              : ContentState.createFromText('');
          } catch (error) {
            // Fallback to plain text if description is not valid JSON
            contentState = ContentState.createFromText(service.description || '');
          }
          
          // Create editor state for each service
          const editorState = EditorState.createWithContent(contentState);

          // Update editorStates with the new editor state
          setEditorStates(prev => ({ ...prev, [service.src ?? ""]: editorState }));

          return {
            category: service.type || '',
            title: service.title || '',
            src: service.src || '',
            content: (
              <div>
                <Editor
                  editorState={editorStates[service.src ?? ""] || editorState}
                  readOnly={true}
                  toolbarHidden
                />
              </div>
            ),
            description: service.description || ''
          } as CardToMapService;
        });

        setCards(cardToMapServices);
        
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchData();
  }, [editorStates]);

  const cards = cards_.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Hãy đến với các dịch vụ của chúng tôi.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
