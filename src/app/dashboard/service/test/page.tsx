"use client"
import React from 'react';
import {convertFromRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface Service {
    title: string;
    description: string;
    type: string;
    src: string;
}

const Test: React.FC = () => {
    // Retrieve the saved service object from localStorage
    const savedService = localStorage.getItem('service');
    const service: Service | null = savedService ? JSON.parse(savedService) : null;

    // Convert the JSON description back to ContentState for rendering
    const renderContentState = service
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(service.description)))
        : null;

    return (
        <div className="App">
            <h3>Saved Service Object:</h3>
            {service && (
                <>
                    <p><strong>Title:</strong> {service.title}</p>
                    <p><strong>Type:</strong> {service.type}</p>
                    <p><strong>Src:</strong> {service.src}</p>
                    <h4>Description:</h4>
                    {renderContentState && (
                        <Editor
                            editorState={renderContentState}
                            toolbarHidden
                            readOnly
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Test;
