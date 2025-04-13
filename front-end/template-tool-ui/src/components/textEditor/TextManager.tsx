import {
  BoldExtension,
  CalloutExtension,
  HeadingExtension,
  ItalicExtension,
} from 'remirror/extensions';
import { useRemirror } from '@remirror/react';
import { RemirrorContentType } from 'remirror';


function TextManager(jsonContentFromStorage: RemirrorContentType) {
  return useRemirror({
    extensions: () => [
      new HeadingExtension({}),
      new BoldExtension({}),
      new ItalicExtension(),
      new CalloutExtension({ defaultType: 'warn' }),
    ],
    content: jsonContentFromStorage,
    // initial cursor position in editor
    selection: 'start',
    stringHandler: 'html',
  });
}
export default TextManager;