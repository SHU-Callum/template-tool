import { useActive, useChainedCommands } from "@remirror/react"
import SaveEditor from "./SaveEditor";

function TextMenu() {
  const chain = useChainedCommands();
  const active = useActive();

  return (
    <div className="flex justify-start items-center gap-1 mt-2">
      <button 
        className={`p-2 w-8 h-8 flex items-center justify-center ${active.bold() ? 'font-bold border-gray-800' : 'border-gray-500'}` }
        onClick={() => {
          chain
          .toggleBold()
          .focus()
          .run();
        }}
      >
        B
      </button>
      <button 
        className={`p-2 w-8 h-8 flex items-center justify-center italic ${active.italic() ? 'font-bold border-gray-800' : 'border-gray-500'}` }
        onClick={() => {
          chain
          .toggleItalic()
          .focus()
          .run();
        }}
      >
        I
      </button>
      <div className="flex items-end ml-auto">
        <SaveEditor />
      </div>
      
    </div>
  )
}
export default TextMenu;