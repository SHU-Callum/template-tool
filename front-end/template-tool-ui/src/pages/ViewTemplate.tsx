import { Link, useLocation } from "react-router";
import { TemplateWithTeamName } from "../models/template";
import BackButton from "../components/BackButton";
import RoundedLabel from "../components/RoundedLabel";
import TextEditor from "../components/textEditor/TextEditor";
import { TemplateViewMode } from "../types/templateViewTypes";
import { useDisplayMode } from "../context/templateDisplay/useDisplayMode";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import RenderModeView from "../components/textEditor/RenderModeView";
import { useNotification } from "../context/notification/useNotification";
import { NotificationType } from "../types/notificationTypes";

function ViewTemplate() {
  const location = useLocation(); // contains template state passed from Search page
  const { mode, setMode } = useDisplayMode(); // edit, input, render modes
  const {addNotification} = useNotification();
  const editorRef = useRef<Editor | null>(null); // reference to tiptap editor for save & copy functionality
  const copyRef = useRef<HTMLDivElement | null>(null); // reference to hidden div designed for copying rendered content
  const [showEditor, setShowEditor] = useState(false); // to prevent editor from remounting on every render
  
  useEffect(() => {
    if (location.state) {
      setMode(location.state.editMode == true ? TemplateViewMode.Edit : TemplateViewMode.Input);
    }
  }, [location.state, setMode]);

  const handleViewModeChange = (newMode: TemplateViewMode) => {
    setMode(newMode);
  }

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getJSON();
      console.log('Document JSON:', content)
      addNotification('Template updated!', NotificationType.SUCCESS);
    }
  }

  const handleCopy = () => {
    if (copyRef.current) {
      const html = copyRef.current.innerHTML;
      const text = copyRef.current.innerText;
      if (window.electronClipboard && typeof window.electronClipboard.write === 'function') {
        window.electronClipboard.write(html, text);
      }
    }
  };

  const templateFromState: TemplateWithTeamName = location.state.template
  let jsonContent = {};
  let validJSON = true;
  try {
    jsonContent = JSON.parse(templateFromState.content);
  }
  catch (error) {
    validJSON = false;
  }

  // Prevents editor from remounting until react render is completed
  useEffect(() => {
    setShowEditor(false);
    // Defer mounting to next tick
    const timeout = setTimeout(() => setShowEditor(true), 0);
    return () => clearTimeout(timeout);
}, [templateFromState.id]);

  const lastAmendDate = new Date(templateFromState.lastAmendDate);
  return (
    <div className="p-4 pl-2 pr-2 w-full sm:w-6/7 mx-auto self-start h-full">
      {!templateFromState || templateFromState === undefined ? (
        <div className="flex justify-center items-center h-full w-full text-gray-500 dark:text-gray-400">
          <p>No template selected. Please select a template to view.</p>
        </div>
        ) : (
        <div className="border rounded-lg shadow-lg p-3 bg-white dark:bg-gray-800 h-full flex flex-col">
          <div className="flex justify-start gap-4">
            <Link to="/">
              <BackButton />
            </Link>
            <div>
              <h3 className="text-left">{templateFromState.title}</h3>
              <p className="text-left italic caption">Created by: Test User, Last update: {lastAmendDate.toLocaleDateString()}</p>
            </div>
            {templateFromState.editable ? 
              <RoundedLabel text={templateFromState.teamName} borderColour="border-green-500" textBold clickAction={() => {}} />
              :
              <RoundedLabel text={templateFromState.teamName} textBold />
            }
          </div>
          <hr />
          {showEditor && (
            validJSON ? (
              <div className="flex justify-start gap-3 mt-2 flex-grow">
                <div className="text-left p-2 border rounded-lg w-full h-full flex flex-col">
                  <TextEditor 
                    key={templateFromState.id}
                    content={jsonContent} 
                    setEditorRef={editor => (editorRef.current = editor)}/>
                </div>
                <div className="flex justify-between mt-4 flex-col gap-1">
                  <div>
                    {mode == TemplateViewMode.Edit && (
                      <button className="bg-green-600 text-white p-2 pl-4 pr-4 rounded w-full" onClick={handleSave}>
                        Save
                      </button>
                    )}
                    {mode == TemplateViewMode.Render && (
                      <button className="bg-green-600 text-white p-2 pl-4 pr-4 rounded w-full" onClick={handleCopy}>
                        Copy
                      </button>
                    )}
                  </div>
                  
                  <div className="flex justify-between gap-1 flex-col">
                    <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded w-full" disabled={mode == TemplateViewMode.Edit} onClick={() => handleViewModeChange(TemplateViewMode.Edit)}>
                      Edit
                    </button>
                    <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded w-full" disabled={mode == TemplateViewMode.Input} onClick={() => handleViewModeChange(TemplateViewMode.Input)}>
                      Input
                    </button>
                    <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded w-full" disabled={mode == TemplateViewMode.Render} onClick={() => handleViewModeChange(TemplateViewMode.Render)}>
                      Preview
                    </button>
                  </div>
                  <div ref={copyRef} className="hidden">
                    <RenderModeView content={editorRef.current?.getJSON()} /> 
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-left p-2 border rounded-lg w-full">
                <p className="text-red-500">Invalid JSON content. Please check the template content.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default ViewTemplate;