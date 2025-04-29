import { useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import { TeamAffiliations } from "../models/team";
import TeamsList from "./TeamsList";
import { NotificationType } from "../types/notificationTypes";
import { useStateContext } from "../context/data/useData";
import BackButton from "./BackButton";

interface SideOutProps {
  isOpen: boolean;
  onClose: () => void;
}

function SideOut({ isOpen, onClose }: SideOutProps) {
  const { addNotification, } = useNotification();
  const state = useStateContext();
  
  const [teams, setTeams] = useState<TeamAffiliations[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamAffiliations[]>([]);
  const [createTeamText, setCreateTeamText] = useState('');
  const [loading, setLoading] = useState(false);
  const errorNotifiedRef = useRef(false); // used to prevent error notification loop

  const createTeamClicked = () => {
    addNotification(`Creating Team: ${createTeamText}`, NotificationType.INFO);
    //TODO: Implement create logic
  };

  // Fetch teams by user locally
  useEffect(() => {
    if (state.teamState.teamsByUser) {
      const formattedTeams = state.teamState.teamsByUser.map((team) => ({
        ...team,
        isOwner: team.ownerId === state.userState.userDetails?.userId,
      }));
      setTeams(formattedTeams);
    }
    if (state.teamState.error && !errorNotifiedRef.current) {
      addNotification(state.teamState.error, NotificationType.ERROR);
      errorNotifiedRef.current = true;
    }
    setLoading(state.teamState.loading);
  }, [addNotification, state.teamState.teamsByUser, state.teamState.error, state.teamState.loading, state.userState.userDetails?.userId]);

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
    <div className={`border-l-2 border-gray-200 p-4 w-3/4 sm:w-1/2 lg:w-5/12 h-full bg-white fixed top-0 right-0 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex w-full pb-4'>
        <div className='flex w-full justify-start gap-4'>
          <BackButton clickAction={onClose} />
          <h2 className='text-left pt-0'>Profile</h2>
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
      <div className="p-6 pb-0">
        <h4 className="text-left">Teams:</h4>
        <div className="flex p-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 flex-grow mr-2"
            value={createTeamText}
            onChange={(e) => setCreateTeamText(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 pl-4 pr-4 rounded" 
            onClick={createTeamClicked}
            disabled={!createTeamText}>
            Create
          </button>
        </div>
      </div>
      <TeamsList loading={loading} teams={filteredTeams}></TeamsList>
    </div>
  );
}

export default SideOut;