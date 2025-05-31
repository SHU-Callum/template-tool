import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TextInput from './TextInput'

// Custom Tiptap Node for text input fields
export const TextInputNode = Node.create({
    name: 'textInput',
    group: 'inline',
    inline: true,
    atom: false,
    selectable: false,
    addAttributes() {
        return {
            placeholder: {
                default: 'Prompt...',
            },
            id: {
                default: () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Unique ID for the input
            },
            value: {
                default: '',
            },
        }
    },
    parseHTML() {
        return [{ tag: 'input[type="text"]' }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['input', { ...HTMLAttributes, type: 'text' }]
    },
    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                const { state, dispatch } = editor.view;
                const { selection } = state;
                const node = selection.$from.nodeAfter;
                if (
                    selection.empty &&
                    node &&
                    node.type.name === this.name &&
                    selection.$from.parentOffset === selection.$from.parent.content.size - node.nodeSize
                ) {
                    // Remove the node if backspace is pressed right after it
                    dispatch(
                        state.tr.delete(selection.$from.pos, selection.$from.pos + node.nodeSize)
                    );
                    return true;
                }
                return false;
            },
            Delete: ({ editor }) => {
                const { state, dispatch } = editor.view;
                const { selection } = state;
                const node = selection.$from.nodeAfter;
                if (
                    selection.empty &&
                    node &&
                    node.type.name === this.name
                ) {
                    // Remove the node if delete is pressed right before it
                    dispatch(
                        state.tr.delete(selection.$from.pos, selection.$from.pos + node.nodeSize)
                    );
                    return true;
                }
                return false;
            },
        }
    },
    // Rendered as a TextInput React component
    addNodeView() {
        return ReactNodeViewRenderer(TextInput)
    }
})
    