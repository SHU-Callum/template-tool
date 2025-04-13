import { EditorComponent, Remirror } from "@remirror/react";
import TextManager from "./TextManager";
import TextMenu from "./TextMenu";
import { RemirrorContentType } from "remirror";

interface TextEditorProps {
  jsonContentFromStorage: RemirrorContentType;
}

function TextEditor({jsonContentFromStorage}: TextEditorProps) {
  const { manager, state } = TextManager(jsonContentFromStorage);

  return (
    <div className='remirror-theme'>
      <Remirror manager={manager} initialContent={state}>
        <div>
          <EditorComponent />
          <hr />
          <TextMenu />
        </div>
      </Remirror >
    </div>
  );
}
export default TextEditor;