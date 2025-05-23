import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { useDisplayMode } from "../../context/templateDisplay/useDisplayMode";
import { TemplateViewMode } from "../../types/templateViewTypes";

const TextInput = (props: NodeViewProps) => {
    const {node, updateAttributes} = props;
    const value = node.attrs.value || "";
    const [displayText, setDisplayText] = useState<string>("");
    const [promptCharCount, setPromptCharCount] = useState(value.length);
    const [inputCharCount, setinputCharCount] = useState(displayText.length);
    const {mode} = useDisplayMode();

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
                    value={value}
                />
            </NodeViewWrapper>
            );
        case TemplateViewMode.Input:
            return (
            <NodeViewWrapper as="span" style={{ display: "inline" }}>
                <input
                    type="text"
                    className={`border border-gray-300 rounded px-2 py-1 ml-1.5 mr-1.5 outline-none text-sm min-w-6`}
                    style={{ width: `${inputCharCount > 14 ? inputCharCount : 14}ch` }}
                    placeholder={value}
                    value={displayText ?? ""}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setinputCharCount(newValue.length);
                        setDisplayText(newValue);
                    }}
                />
            </NodeViewWrapper>
            );
        case TemplateViewMode.Render:
            return displayText && displayText.length > 0 ? (
                <NodeViewWrapper as="span" style={{ display: "inline" }}>
                    <span className="inline">
                        {displayText}
                    </span>
                </NodeViewWrapper>
            ) : null;
    }
};

export default TextInput;