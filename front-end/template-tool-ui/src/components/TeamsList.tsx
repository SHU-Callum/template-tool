import { useNotification } from '../context/notification/useNotification';
import { TeamAffiliations } from '../models/team';
import { NotificationType } from '../types/notificationTypes';

interface TeamsListProps {
  loading: boolean
  teams: TeamAffiliations[];
}

function TeamsList ({ loading, teams }: TeamsListProps) {
  const { addNotification } = useNotification();
  // split teams into owners and members groupings
  const members = teams.filter(team => !team.isOwner);
  const owners = teams.filter(team => team.isOwner);

  return (
    <div className="flex">
      <div className="flex-1 pl-2">
        <h5>Member</h5>
        <ul className="space-y-2 pt-2">
            {loading ? (
            <li>Loading...</li>
            ) : members.length < 1 ? (
              <li className="relative group">
                -
                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-4">
                  Not a member of a team
                </span>
              </li>
            ) : (
              members.map((team, index) => (
                <li key={index} className="border-4 rounded-3xl border-blue-500 p-2 w-5/6 mx-auto">
                <span>{team.teamName}</span>
                </li>
              ))
            )}
        </ul>
      </div>
      <div className="flex-1 pr-2">
        <h5>Owner</h5>
        <ul className="space-y-2 pt-2">
          {loading ? (
            <li>Loading...</li>
          ) : owners.length < 1 ? (
            <li className="relative group">
              -
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-4">
                Not an owner of a team
              </span>
            </li>
          ) : (
            owners.map((team, index) => (
              <li key={index} className="border-4 rounded-3xl border-green-500 p-2 w-5/6 mx-auto cursor-pointer" onClick={() => addNotification(`${team.teamName} clicked`, NotificationType.INFO)}>
                <div className='flex gap-2 items-center justify-center'>
                  <span>{team.teamName}</span>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                  </svg>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TeamsList;