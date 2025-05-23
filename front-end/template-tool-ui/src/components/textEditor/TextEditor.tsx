import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextMenu from './TextMenu'
import Underline from '@tiptap/extension-underline'
import { TextInputNode } from './TextInputNode'
import { useDisplayMode } from '../../context/templateDisplay/useDisplayMode'

const extensions = [
  StarterKit,
  Underline,
  TextInputNode
]

interface TextEditorProps {
  content: {} // template to display (JSON format)
}

const TextEditor = (props: TextEditorProps) => {
  const { mode } = useDisplayMode()
  return (
      <EditorProvider 
        extensions={extensions} 
        content={props.content} 
        slotBefore={<TextMenu mode={mode}/>}
        editorContainerProps={{ className: "w-full h-full" }}
        >
      </EditorProvider>
  )
}

export default TextEditor