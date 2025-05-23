import { Link, useLocation } from "react-router";
import { TemplateWithTeamName } from "../models/template";
import BackButton from "../components/BackButton";
import RoundedLabel from "../components/RoundedLabel";
import TextEditor from "../components/textEditor/TextEditor";
import { TemplateViewMode } from "../types/templateViewTypes";
import { useState } from "react";

function ViewTemplate() {
  const location = useLocation();
  const [viewMode, setViewMode] = useState(TemplateViewMode.Edit)

  const handleViewModeChange = (mode: TemplateViewMode) => {
    setViewMode(mode);
  }

  const templateFromState: TemplateWithTeamName = location.state.template
  let jsonContent = {};
  let validJSON = true;
  try {
    jsonContent = JSON.parse(templateFromState.content);
  }
  catch (error) {
    validJSON = false;
  }

  const lastAmendDate = new Date(templateFromState.lastAmendDate);
  return (
    <div className="p-4 w-full sm:w-6/7 mx-auto self-start h-full">
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
          {validJSON ? (
            <div className="flex justify-start gap-4 mt-2 flex-grow">
              <div className="text-left p-2 border rounded-lg w-full h-full flex flex-col">
                <TextEditor content={jsonContent} editable={viewMode == TemplateViewMode.Edit}/>
              </div>
              <div className="flex justify-end mt-4 flex-col gap-1">
                <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" disabled={viewMode == TemplateViewMode.Edit} onClick={() => handleViewModeChange(TemplateViewMode.Edit)}>
                  Edit
                </button>
                <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" disabled={viewMode == TemplateViewMode.Input} onClick={() => handleViewModeChange(TemplateViewMode.Input)}>
                  Input
                </button>
                <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" disabled={viewMode == TemplateViewMode.Render} onClick={() => handleViewModeChange(TemplateViewMode.Render)}>
                  Preview
                </button>
              </div>
            </div>
            ) : (
            <div className="text-left p-2 border rounded-lg w-full">
              <p className="text-red-500">Invalid JSON content. Please check the template content.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default ViewTemplate;