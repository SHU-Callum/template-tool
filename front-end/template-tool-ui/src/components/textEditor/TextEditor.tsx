import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextMenu from './TextMenu'
import Underline from '@tiptap/extension-underline'
import { TextInputNode } from './TextInputNode'
import { useDisplayMode } from '../../context/templateDisplay/useDisplayMode'
import { useEffect } from 'react'

const extensions = [
  StarterKit,
  Underline,
  TextInputNode // custom field
]

interface EditorRefSetterProps {
  setEditorRef?: (editor: any) => void;
}

// provides a way to set the editor ref from outside the component
const EditorRefSetter = ({ setEditorRef }: EditorRefSetterProps) => {
  const { editor } = useCurrentEditor();
  // Set the ref when editor is available
  useEffect(() => {
    if (editor && setEditorRef) {
      setEditorRef(editor);
    }
  }, [editor, setEditorRef]);
  return null;
};

interface TextEditorProps {
  content: {} // template to display (JSON format)
  setEditorRef?: (editor: any) => void; // optional ref setter for the editor instance
}

// TipTap editor component for text editing
const TextEditor = (props: TextEditorProps) => {
  const { mode } = useDisplayMode()
  return (
      <EditorProvider 
        extensions={extensions} 
        content={props.content} 
        slotBefore={<TextMenu mode={mode}/>}
        editorContainerProps={{ className: "w-full h-full" }}
        >
          <EditorRefSetter setEditorRef={props.setEditorRef} />
      </EditorProvider>
  )
}

export default TextEditor