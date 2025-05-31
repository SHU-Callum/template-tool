import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { useDisplayMode } from "../../context/templateDisplay/useDisplayMode";
import { TemplateViewMode } from "../../types/templateViewTypes";

// Custom Input field for Tiptap editor
// This component handles the display and editing of text input fields in different modes (Edit, Input, Render)
const TextInput = (props: NodeViewProps) => {
    const {node, updateAttributes} = props;
    const id = node.attrs.id; // Unique for each text input
    const prompt = node.attrs.value ?? ""; // updated in edit mode. Displayed in Input Mode placeholder
    const [promptCharCount, setPromptCharCount] = useState(prompt.length); // used for setting the width of the input field
    const {mode, inputFields, setInputFields} = useDisplayMode(); // While prompt is saved to the node, display value is saved to React context

    switch (mode) {
        case TemplateViewMode.Edit:
            return (
            <NodeViewWrapper as="span" style={{ display: "inline"}}>
                <input
                    type="text"
                    className={`border border-gray-300 rounded px-2 py-1 ml-1.5 mr-1.5 outline-none text-sm min-w-6`}
                    style={{ width: `${promptCharCount > 14 ? promptCharCount : 14}ch` }}
                    placeholder="Prompt here..."
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setPromptCharCount(newValue.length);
                        updateAttributes({ value: newValue });
                    }}
                    value={prompt}
                />
            </NodeViewWrapper>
            );
        case TemplateViewMode.Input:
            // Input field displays prompt as placeholder and allows user to input text for React context
            return (
            <NodeViewWrapper as="span" style={{ display: "inline" }}>
                <input
                    type="text"
                    className={`border border-gray-300 rounded px-2 py-1 ml-1.5 mr-1.5 outline-none text-sm min-w-6`}
                    style={{ width: `${inputFields[id]?.length > 14 ? inputFields[id]?.length : 14}ch` }}
                    placeholder={prompt}
                    value={inputFields[id] ?? ""}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setInputFields((fields => ({...fields, [id]: newValue })));
                    }}
                />
            </NodeViewWrapper>
            );
        case TemplateViewMode.Render:
            // Each input field displays its value fetched from React context
            return inputFields[id] && inputFields[id].length > 0 ? (
                <NodeViewWrapper as="span" style={{ display: "inline" }}>
                    <span className="inline">
                        {inputFields[id]}
                    </span>
                </NodeViewWrapper>
            ) : null;
    }
};

export default TextInput;