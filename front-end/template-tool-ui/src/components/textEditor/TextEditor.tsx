import { EditorProvider, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextMenu from './TextMenu'
import Underline from '@tiptap/extension-underline'
import { TextInputNode } from './TextInputNode'
import { useEffect } from 'react'

const extensions = [
  StarterKit,
  Underline,
  TextInputNode
]

interface TextEditorProps {
  content: {} // template to display (JSON format)
  editable: boolean // whether the editor is editable or not
}

const TextEditor = (props: TextEditorProps) => {
  const editor = useEditor({
    extensions,
    content: props.content,
    editable: props.editable,
  })

  useEffect(() => {
    if(editor) {
      editor.setEditable(props.editable)
    }
  }, [props.editable, editor])
  
  return (
    <EditorProvider 
      extensions={extensions} 
      content={props.content} 
      slotBefore={<TextMenu edit={props.editable}/>}
      editorContainerProps={{ className: "w-full h-full" }}
      >
    </EditorProvider>
  )
}

export default TextEditor