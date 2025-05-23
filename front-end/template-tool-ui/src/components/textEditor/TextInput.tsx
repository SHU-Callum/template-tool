import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";

const TextInput = (props: NodeViewProps) => {
    const {editor, node, updateAttributes} = props;
    const value = node.attrs.value || "";
    const [charCount, setCharCount] = useState(0);
    const [isEditable, setIsEditable] = useState(editor.isEditable);

    useEffect(() => {
        const updateEditable = () => setIsEditable(editor.isEditable);
        editor.on('update', updateEditable);
        return () => {
            editor.off('update', updateEditable);
        };
    }, [editor]);

    if (isEditable) {
        return (
            <NodeViewWrapper as="span" style={{ display: "inline"}}>
                <input
                type="text"
                className={`border border-gray-300 rounded px-2 py-1 ml-1.5 mr-1.5 outline-none text-sm min-w-6`}
                style={{ width: `${charCount > 14 ? charCount : 14}ch` }}
                placeholder="Prompt here..."
                onChange={(e) => {
                    const newValue = e.target.value;
                    setCharCount(newValue.length);
                    updateAttributes({ value: newValue });
                }}
                />
            </NodeViewWrapper>
        );
    } else {
        return (
            <NodeViewWrapper as="span" style={{ display: "inline" }}>
                <span className="inline">
                    {value || node.attrs.placeholder}
                </span>
            </NodeViewWrapper>
        );
    }
};

export default TextInput;