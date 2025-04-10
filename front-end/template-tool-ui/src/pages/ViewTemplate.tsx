import { Link, useLocation } from "react-router";
import { TemplateWithTeamName } from "../models/template";
import BackButton from "../components/BackButton";
import RoundedLabel from "../components/RoundedLabel";

function ViewTemplate() {
  const location = useLocation();
  const templateFromState: TemplateWithTeamName = location.state.template

  const lastAmendDate = new Date(templateFromState.lastAmendDate);
  return (
    <div className="p-4 w-full sm:w-6/7 mx-auto">
      {!templateFromState || templateFromState === undefined ? (
        <div className="flex justify-center items-center h-full w-full text-gray-500 dark:text-gray-400">
          <p>No template selected. Please select a template to view.</p>
        </div>
        ) : (
      <div className="border rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800">
        <div className="flex justify-start gap-4">
          <Link to="/">
            <BackButton />
          </Link>
          <h2 className="text-left">Viewing Template</h2>
          {templateFromState.editable ? 
            <RoundedLabel text={templateFromState.teamName} borderColour="border-green-500" textBold clickAction={() => {}} />
            :
            <RoundedLabel text={templateFromState.teamName} textBold />
          }
          </div>
        <h3 className="text-left">{templateFromState.title}</h3>
        <p className="text-left italic p-1">Created by: Test User, Last update: {lastAmendDate.toLocaleDateString()}</p>
        <hr />
        <div className="flex justify-start gap-4 mt-4">
          <div className="text-left p-2 border rounded-lg w-full">
            <p>{templateFromState.content}</p>
          </div>
          <div className="flex justify-end mt-4 flex-col gap-1">
            <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" onClick={() => {}}>
              Input
            </button>
            <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" disabled onClick={() => {}}>
              Preview
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
export default ViewTemplate;