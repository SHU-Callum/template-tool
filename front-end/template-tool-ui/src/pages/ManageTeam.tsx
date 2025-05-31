import { useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import { Team } from "../models/team";
import { Link, useLocation } from "react-router";
import BackButton from "../components/BackButton";
import RoundedLabel from "../components/RoundedLabel";
import { NotificationType } from "../types/notificationTypes";

function ManageTeam() {
  // from context providers
  const { addNotification, handleNetworkError, networkError } = useNotification();
  const state = useStateContext();
  const dispatch = useDispatchContext();

  // local state
  const location = useLocation();
  const selectedTeam = location.state?.selectedTeam as Team | undefined; // get selected team from location state
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop
  const [addEmployeeText, setCreateTeamText] = useState('');

  const addEmployeeClicked = () => {
    addNotification(`Adding Employee: ${addEmployeeText}`, NotificationType.INFO);
  }

  // reset error notification flag when an API call is loading
  useEffect(() => {
    if (state.templateState.loading || state.teamState.loading) {
      errorNotifiedRef.current = false;
    }
  }, [state.teamState.loading, state.templateState.loading]);

  return (
    <div className="p-1 sm:p-4 w-full sm:w-6/7 mx-auto self-start h-full">
       <div className="border rounded-lg shadow-lg p-3 bg-white dark:bg-gray-800 h-full flex flex-col">
        <div className="flex justify-start items-center gap-4">
          <Link to="/">
            <BackButton />
          </Link>
          <div>
            <h3 className="text-left">Manage Team</h3>
          </div>
          {selectedTeam && <RoundedLabel text={selectedTeam.teamName} borderColour="border-green-500" textBold />}
        </div>
        <hr />
        {selectedTeam ? (
          <div className="text-gray-500 p-4">
            <div className="p-2 py-1">
              <h4 className="text-left">Add New Member:</h4>
              <div className="flex p-2 pl-0 sm:p-4">
                <input
                  type="text"
                  placeholder="Email Address..."
                  className="border rounded p-2 flex-grow mr-2"
                  value={addEmployeeText}
                  onChange={(e) => setCreateTeamText(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded min-w-20" 
                  onClick={addEmployeeClicked}
                  disabled={addEmployeeText.length < 1}>
                  Add
                </button>
              </div>
            </div>
            <hr />
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-2 py-2 w-full">
                <h3>Members</h3>
                <ul className="space-y-2 pt-2">
                  {selectedTeam.members.map((member, index) => (
                    <li key={index} className="w-5/6 mx-auto">
                      <RoundedLabel text={member} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2 py-2 w-full">
                <h3>Owners</h3>
                <ul className="space-y-2 pt-2">
                  {selectedTeam.ownerIds.map((owner, index) => (
                    <li key={index} className="w-5/6 mx-auto">
                      <RoundedLabel text={owner.toString()} borderColour="border-green-500"/>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center items-center text-gray-500 w-full h-full flex justify-center text-base sm:text-xl md:text-2xl">
            Failed to load team details.
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageTeam;