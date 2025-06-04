import { useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import { TeamAffiliations } from "../models/team";
import TeamsList from "./TeamsList";
import { NotificationType } from "../types/notificationTypes";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import BackButton from "./buttons/BackButton";
import { useAuth } from "../context/auth/useAuth";
import { useSideOut } from "../context/sideOut/useSideOut";
import { createTeam } from "../context/data/actions/teamActions";

interface SideOutProps {
  isOpen: boolean;
  onClose: () => void;
}

function SideOut({ isOpen, onClose }: SideOutProps) {
  const { addNotification, } = useNotification();
  const { logout } = useAuth();
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const {setFocusTeamCreate, focusTeamCreate} = useSideOut();
  const [teams, setTeams] = useState<TeamAffiliations[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamAffiliations[]>([]);
  const [createTeamText, setCreateTeamText] = useState('');
  const [loading, setLoading] = useState(false);
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop
  const prevTeamsRef = useRef(state.teamState.teamsByUser); // used to prevent unnecessary rerendering

  const createTeamClicked = () => {
    if (!createTeamText) {
      addNotification('Please enter a team name', NotificationType.WARNING);
      return;
    }
    createTeam(createTeamText, state.userState.userDetails!.id, dispatch);
  };

  // Fetch teams by user locally. Splits teams into owner and regular member roles
  useEffect(() => {
    if (focusTeamCreate) {
      setFocusTeamCreate(false);
    }
    if (state.teamState.teamsByUser) {
      const formattedTeams = state.teamState.teamsByUser.map((team) => ({
        ...team,
        isOwner: team.ownerIds.includes(state.userState.userDetails!.id),
      }));
      setTeams(formattedTeams);
    }
    if (state.teamState.error?.teamsByUserError && !errorNotifiedRef.current && state.teamState.teamsByUser === null) {
      addNotification(state.teamState.error.teamsByUserError, NotificationType.ERROR);
      errorNotifiedRef.current = true;
    }
    setLoading(state.teamState.loading);
  }, [addNotification, state.teamState.teamsByUser, state.teamState.error, state.teamState.loading, state.userState.userDetails]);

  // When Create Team API call is successful, update the teams list
  useEffect(() => {
    if (state.teamState.teamsByUser && state.teamState.teamsByUser !== prevTeamsRef.current) {
      const formattedTeams = state.teamState.teamsByUser.map((team) => ({
        ...team,
        isOwner: team.ownerIds.includes(state.userState.userDetails!.id),
      }));
      setTeams(formattedTeams);
      setFilteredTeams(formattedTeams);
      prevTeamsRef.current = state.teamState.teamsByUser;
      addNotification(`Team created successfully: ${createTeamText}`, NotificationType.SUCCESS);
      setCreateTeamText('');
    }
    if (state.teamState.error?.createTeam && !errorNotifiedRef.current) {
      addNotification(state.teamState.error.createTeam, NotificationType.ERROR);
      errorNotifiedRef.current = true;
    }
  }, [addNotification, state.teamState.teamsByUser, state.teamState.error?.createTeam, state.userState.userDetails]);

  // Prevents error notification loop
  useEffect(() => {
    if (state.teamState.loading) {
      errorNotifiedRef.current = false;
    }
  }, [state.teamState.loading]);

  // Filter teams by search text
  useEffect(() => {
    if (createTeamText === '') {
      setFilteredTeams(teams);
    } else {
      setFilteredTeams(teams.filter((team) => team.teamName.toLowerCase().includes(createTeamText.toLowerCase())));
    }
  }, [createTeamText, teams]);

  return (
    <div className={`border-l-2 border-gray-200 p-4 w-3/4 sm:w-3/5 lg:w-1/3 h-full bg-white fixed top-0 right-0 z-40 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex w-full pb-4'>
        <div className='flex w-full justify-start gap-4'>
          <BackButton clickAction={onClose} />
          <h2 className='text-left pt-0'>Profile</h2>
            <button 
              className="p-2 m-1 ml-auto bg-orange-400 rounded hover:bg-orange-500 transition-colors"
              onClick={ logout }>
              Logout
            </button>
        </div>
      </div>
      <div className="text-left p-2">
        {state.userState.userDetails?.displayName ? (
          <div>
            <h3>{state.userState.userDetails?.displayName}</h3>
            <p>{state.userState.userDetails?.email}</p>
          </div>
        ) : <div>N/A</div>}
      </div>
      <div className="p-2 sm:p-6 pb-0">
        <h4 className="text-left">Teams:</h4>
        <div className="flex p-2 pl-0 sm:p-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 flex-grow mr-2"
            value={createTeamText}
            onChange={(e) => setCreateTeamText(e.target.value)}
            autoFocus={focusTeamCreate}
          />
          <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" 
            onClick={createTeamClicked}
            disabled={!createTeamText}>
            Create
          </button>
        </div>
      </div>
      <TeamsList loading={loading} teams={filteredTeams} closeSideout={onClose}></TeamsList>
    </div>
  );
}

export default SideOut;