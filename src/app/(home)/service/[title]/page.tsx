"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Service} from "@/types/service";
import {ContentState, convertFromRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function Page({params}: { params: { title: string } }) {
    const [service, setService] = useState<Service | null>(null);
    const [editorState, setEditorState] = useState<EditorState | null>(null);
    const {title} = params;

    useEffect(() => {
        const fetchService = async () => {
            if (!title) {
                console.error('Title is null or undefined');
                return;
            }
            try {
                const response = await axios.get('https://localhost:7192/service-management/services', {
                    params: {title}
                });

                if (response.data.results.length > 0) {
                    const fetchedService = response.data.results[0] as Service;
                    setService(fetchedService);

                    let contentState;

                    try {
                        // Attempt to parse description as JSON
                        contentState = fetchedService.description
                            ? convertFromRaw(JSON.parse(fetchedService.description))
                            : ContentState.createFromText('');
                    } catch (error) {
                        // Fallback to plain text if description is not valid JSON
                        contentState = ContentState.createFromText(fetchedService.description || '');
                    }

                    // Create editor state for the service description
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState);
                } else {
                    console.error('No service found with the given title');
                }
            } catch (error) {
                console.error('Failed to fetch service:', error);
            }
        };

        fetchService();
    }, [title]);

    return (
        <>
            {service && (
                <div className="service-details">
                    <h1>{service.name}</h1>
                    {editorState && (
                        <div>
                            <Editor
                                editorState={editorState}
                                readOnly={true}
                                toolbarHidden
                            />
                        </div>
                    )}
                    {/* Render other service details here */}
                </div>
            )}
        </>
    );
}
