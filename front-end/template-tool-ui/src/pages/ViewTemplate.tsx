import { Link, useLocation } from "react-router";
import { TemplateWithTeamName, TempTemplate } from "../models/template";
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
import { dateToMysqlDatetime } from "../utils/dateFormatter";
import { updateTemplate } from "../context/data/actions/templateActions";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import { addTeamNameToTemplate } from "../utils/idToName";

function ViewTemplate() {
  const location = useLocation(); // contains template state passed from Search page
  const { mode, setMode } = useDisplayMode(); // edit, input, render modes
  const {addNotification} = useNotification();
  const editorRef = useRef<Editor | null>(null); // reference to tiptap editor for save & copy functionality
  const copyRef = useRef<HTMLDivElement | null>(null); // reference to hidden div designed for copying rendered content
  const [showEditor, setShowEditor] = useState(false); // to prevent editor from remounting on every render
  const dispatch = useDispatchContext();
  const state = useStateContext();
  const [activeTemplate, setActiveTemplate] = useState<TemplateWithTeamName | null>(location.state.template);
  const [validJSON, setValidJSON] = useState(true);

  const handleViewModeChange = (newMode: TemplateViewMode) => {
    setMode(newMode);
  }

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getJSON();
      const timeOfUpdate = (dateToMysqlDatetime(new Date()));
      // convert template with team name to regular template compatible with backend
      if (!activeTemplate) return;
      const { teamName: _teamName, ...baseTemplate } = activeTemplate;
      const updatedTemplate: TempTemplate = {
        ...baseTemplate,
        lastAmendDate: timeOfUpdate,
        content: JSON.stringify(content),
      };
      updateTemplate(updatedTemplate, dispatch);
    }
  }

  // Copies the rendered content to clipboard using Electron clipboard API
  const handleCopy = () => {
    try {
      if (copyRef.current) { // uses hidden div to copy rendered content
        const html = copyRef.current.innerHTML;
        const text = copyRef.current.innerText;
        if (window.electronClipboard && typeof window.electronClipboard.write === 'function') {
          window.electronClipboard.write(html, text);
        }
        addNotification('Copied to clipboard!', NotificationType.SUCCESS);
      }
    } catch (error) {
      addNotification(`Error copying content: ${error}`, NotificationType.ERROR);
    }
  };

  // When active template is updated, check if the content is valid JSON
  useEffect(() => {
    if (activeTemplate) {
      try {
        JSON.parse(activeTemplate.content);
      } catch (error) {
        setValidJSON(false);
      }
    }
  }, [activeTemplate]);

  // Sets inital view mode based on if Edit or Open button was clicked in Search page
  useEffect(() => {
    if (location.state) {
      setActiveTemplate(location.state.template);
      setMode(location.state.editMode == true ? TemplateViewMode.Edit : TemplateViewMode.Input);
    }
  }, [location.state, setMode]);

  // Prevents editor from remounting until react render is completed
  useEffect(() => {
    setShowEditor(false);
    // Defer mounting to next tick
    const timeout = setTimeout(() => setShowEditor(true), 0);
    return () => clearTimeout(timeout);
}, [activeTemplate?.id]);

  // When the PUT Update Template API call returns
  useEffect (() => {
    if(state.templateState.updateTemplate && state.teamState.teamsByUser) {
      addNotification('Template updated successfully!', NotificationType.SUCCESS);
      setActiveTemplate(addTeamNameToTemplate(state.templateState.updateTemplate, state.teamState.teamsByUser));
      state.templateState.resetUpdateTemplate(); // reset updateTemplate to null to prevent re-rendering
    }
    else if (state.templateState.error) {
      addNotification(`Error updating template: ${state.templateState.error}`, NotificationType.ERROR);
    }
  }, [state.templateState.updateTemplate, addNotification]);

  return (
    <div className="p-4 pl-2 pr-2 w-full sm:w-6/7 mx-auto self-start h-full">
      {!activeTemplate || activeTemplate === undefined ? (
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
              <h3 className="text-left">{activeTemplate.title}</h3>
              <p className="text-left italic caption">Last update: {new Date(activeTemplate.lastAmendDate).toLocaleDateString()}</p>
            </div>
            {activeTemplate.editable ? 
              <RoundedLabel text={activeTemplate.teamName} borderColour="border-green-500" textBold clickAction={() => {}} />
              :
              <RoundedLabel text={activeTemplate.teamName} textBold />
            }
          </div>
          <hr />
          {showEditor && (
            validJSON ? (
              <div className="flex justify-start gap-3 mt-2 flex-grow">
                <div className="text-left p-2 border rounded-lg w-full h-full flex flex-col">
                  <TextEditor 
                    key={activeTemplate.id}
                    content={JSON.parse(activeTemplate.content)} 
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
                    {location.state.canEdit && (
                      <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded w-full" disabled={mode == TemplateViewMode.Edit} onClick={() => handleViewModeChange(TemplateViewMode.Edit)}>
                        Edit
                      </button>
                    )}
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