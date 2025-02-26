import { useNotification } from '../context/notification/useNotification';
import { Team } from '../models/team';

interface TeamsListProps {
  teams: Team[];
}

function TeamsList ({ teams }: TeamsListProps) {
  const { addNotification } = useNotification();
  const members = teams.filter(team => !team.isOwner);
  const owners = teams.filter(team => team.isOwner);

  return (
    <div className="flex">
      <div className="flex-1 pl-2">
        <h5>Members</h5>
        <ul className="space-y-2 pt-2">
          {members.map((team, index) => (
            <li key={index} className="border-4 rounded-3xl border-blue-500 p-2 w-5/6 mx-auto">
              <span>{team.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 pr-2">
        <h5>Owners</h5>
        <ul className="space-y-2 pt-2">
          {owners.map((team, index) => (
            <li key={index} className="border-4 rounded-3xl border-green-500 p-2 w-5/6 mx-auto cursor-pointer" onClick={() => addNotification(`${team.name} clicked`)}>
              <div className='flex gap-2 items-center justify-center'>
                <span>{team.name}</span>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamsList;