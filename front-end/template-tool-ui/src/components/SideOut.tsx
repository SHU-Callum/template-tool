import { useEffect, useRef, useState } from "react";
import { useNotification } from "../context/notification/useNotification";
import { TeamAffiliations } from "../models/team";
import TeamsList from "./TeamsList";
import { NotificationType } from "../types/notificationTypes";
import { useStateContext } from "../context/data/useData";

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

  useEffect(() => {
    if (state.teamState.teamsByUser) {
      const formattedTeams = state.teamState.teamsByUser.map((team) => ({
        ...team,
        // TODO: provide context for current user id
        isOwner: team.ownerId === 1,
      }));
      setTeams(formattedTeams);
    }
    if (state.teamState.error && !errorNotifiedRef.current) {
      addNotification(state.teamState.error, NotificationType.ERROR);
      errorNotifiedRef.current = true;
    }
    setLoading(state.teamState.loading);
  }, [addNotification, state.teamState.teamsByUser, state.teamState.error, state.teamState.loading]);

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
      setFilteredTeams(teams.filter((team) => team.name.toLowerCase().includes(createTeamText.toLowerCase())));
    }
  }, [createTeamText, teams]);

  return (
    <div className={`border-l-2 border-gray-200 p-4 w-1/2 h-full bg-white fixed top-0 right-0 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex w-full pb-4'>
        <div className='flex w-full justify-start gap-4'>
          <svg onClick={onClose} className="w-12 h-12 text-gray-800 dark:text-white mt-0.5 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-transform transform hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
          </svg>
          <h2 className='text-left'>Profile</h2>
        </div>
      </div>
      {/* TODO: Dynamic data */}
      <div className="text-left p-2">
        <h3>Test User</h3>
        <p>test@user.com</p>
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