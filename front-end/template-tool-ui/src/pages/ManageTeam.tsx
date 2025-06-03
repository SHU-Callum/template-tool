import { useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import { Team } from "../models/team";
import { useLocation, useNavigate } from "react-router";
import BackButton from "../components/buttons/BackButton";
import RoundedLabel from "../components/RoundedLabel";
import { NotificationType } from "../types/notificationTypes";
import { addTeamMember, getMemberNamesByTeam, promoteTeamMember } from "../context/data/actions/teamActions";
import { TeamMember } from "../models/teamMember";
import MoveRightButton from "../components/buttons/MoveRightButton";

function ManageTeam() {
  // from context providers
  const { addNotification, handleNetworkError } = useNotification();
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const navigate = useNavigate();

  // local state
  const location = useLocation();
  const selectedTeam = location.state?.selectedTeam as Team | undefined; // get selected team from location state
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop
  const [addEmployeeText, setCreateTeamText] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const hasFetchedMembers = useRef(false);

  const addEmployeeClicked = () => {
    if (!selectedTeam) {
      addNotification(`Failed to add employee: No team selected`, NotificationType.ERROR);
      return;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addEmployeeText.trim())) {
      addNotification(`Please enter a valid email address.`, NotificationType.ERROR);
      return;
    }
    // search and add employee
    addTeamMember(addEmployeeText.trim(), selectedTeam.id, dispatch)
      .then(() => {
        setCreateTeamText(''); // clear input field after successful addition
      })
    addNotification(`Adding Employee: ${addEmployeeText}`, NotificationType.INFO);
  }

  const promoteMember = (memberId: number) => {
    if(selectedTeam) {
      promoteTeamMember(memberId, selectedTeam?.id, dispatch)
    } else {
      addNotification(`Failed to promote member: No team selected`, NotificationType.ERROR);
    }
  }

  // When the component mounts, GET team members for the selected team
  useEffect(() => {
    if (selectedTeam  && !hasFetchedMembers.current) {
      hasFetchedMembers.current = true; // prevent multiple fetches for the same team
      // Fetch member names for the selected team
      getMemberNamesByTeam(selectedTeam.id, dispatch)
        .then(() => {
          if (state.teamState.error && !errorNotifiedRef.current) {
            addNotification(`Failed to load team members: ${state.teamState.error}`, NotificationType.ERROR);
            errorNotifiedRef.current = true; // prevent further notifications
          }
        })
        .catch((error) => {
          if (!errorNotifiedRef.current) {
            addNotification(`Error fetching team members: ${error.message}`, NotificationType.ERROR);
            errorNotifiedRef.current = true; // prevent further notifications
          }
          handleNetworkError(error);
      });
    }
  }, [selectedTeam, dispatch, state.teamState.error, addNotification]);

  // When GET team members API call is successful, update the teamMembers state
  useEffect(() => {
    if(state.teamState.membersByTeam) {
      setTeamMembers(state.teamState.membersByTeam);
    }
  }, [state.teamState.membersByTeam]);

  // When PUT promote member API call is successful, update the teamMembers state
  useEffect(() => {
    if (state.teamState.membersByTeam && state.teamState.promotion) {
      setTeamMembers(state.teamState.membersByTeam);
      state.teamState.resetPromotion(); // reset promotion state
      errorNotifiedRef.current = false; // reset error notification flag
      addNotification(`Member promoted successfully`, NotificationType.SUCCESS);
    }
    else if (state.teamState.error && !errorNotifiedRef.current) {
      addNotification(`Failed to promote member: ${state.teamState.error}`, NotificationType.ERROR);
      errorNotifiedRef.current = true; // prevent further notifications
    }
  }, [state.teamState.membersByTeam, state.teamState.error, addNotification]);

  // When POST add member API call is successful, update the teamMembers state
  useEffect(() => {
    if (state.teamState.addMember) {
      setTeamMembers((prevMembers) => [...prevMembers, state.teamState.addMember as TeamMember]);
      state.teamState.resetAddMember(); // reset add member state
      errorNotifiedRef.current = false; // reset error notification flag
      addNotification(`Member added successfully: ${state.teamState.addMember.displayName}`, NotificationType.SUCCESS);
    }
    else if (state.teamState.error && !errorNotifiedRef.current) {
      addNotification(`Failed to add member: ${state.teamState.error}`, NotificationType.ERROR);
      errorNotifiedRef.current = true; // prevent further notifications
    }
  }, [state.teamState.addMember, state.teamState.error, addNotification]);

  // reset error notification flag when an API call is loading
  useEffect(() => {
    if (state.templateState.loading || state.teamState.loading) {
      errorNotifiedRef.current = false;
    }
  }, [state.teamState.loading, state.templateState.loading]);

  return (
    <div className="p-2 pl-1 pr-1 w-full sm:w-6/7 mx-auto self-start h-full">
      <div className="border rounded-lg shadow-lg p-3 py-2 bg-white dark:bg-gray-800 h-full flex flex-col">
        <div className="flex justify-start items-center gap-4 pb-1">
          <BackButton clickAction={() => navigate(-1)}/>
          <div className="mb-0.5">
            <h3 className="text-left">Manage Team</h3>
          </div>
          <div className="ml-auto mb-0.5">
            {selectedTeam && <RoundedLabel text={selectedTeam.teamName} borderColour="border-green-500" textBold />}
          </div>
        </div>
        <hr />
        {teamMembers ? (
          <div className="p-4">
            <div className="p-2 py-1">
              <h4 className="text-left">Add New Member:</h4>
              <div className="flex p-2 pl-0 sm:p-4">
                <input
                  type="text"
                  placeholder="Enter Email Address..."
                  className="border rounded p-2 flex-grow mr-2"
                  value={addEmployeeText}
                  onChange={(e) => setCreateTeamText(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded min-w-20" 
                  onClick={addEmployeeClicked}
                  disabled={addEmployeeText.trim().length < 1}>
                  Add
                </button>
              </div>
            </div>
            <hr />
            <div className="flex justify-between gap-2 py-2">
              <div className="flex flex-col gap-2 py-2 w-full">
                <h3>Members</h3>
                <ul className="space-y-2 pt-2">
                  {teamMembers.filter((member) => !member.isOwner).map((member, index) => (
                    <li key={index} className="w-5/6 mx-auto">
                      <RoundedLabel text={member.displayName} iconButton={<MoveRightButton clickAction={() => {promoteMember(member.id)}}/>}/>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2 py-2 w-full">
                <h3>Owners</h3>
                <ul className="space-y-2 pt-2">
                  {teamMembers.filter((member) => member.isOwner).map((owner, index) => (
                    <li key={index} className="w-5/6 mx-auto">
                      <RoundedLabel text={owner.displayName} borderColour="border-green-500"/>
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