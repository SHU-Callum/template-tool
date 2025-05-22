import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextMenu from './TextMenu'
import Underline from '@tiptap/extension-underline'

const extensions = [
  StarterKit,
  Underline
]

interface TextEditorProps {
  content: {} // template to display (JSON format)
}

const TextEditor = (props: TextEditorProps) => {
  return (
    <EditorProvider 
      extensions={extensions} 
      content={props.content} 
      slotBefore={<TextMenu />}
      editorContainerProps={{ className: "w-full h-full" }}
      >
    </EditorProvider>
  )
}

export default TextEditor