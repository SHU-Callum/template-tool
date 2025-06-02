import { useNavigate } from 'react-router';
import { TeamAffiliations } from '../models/team';
import RoundedLabel from './RoundedLabel';

interface TeamsListProps {
  loading: boolean
  teams: TeamAffiliations[]
  closeSideout?: () => void;
}

function TeamsList ({ loading, teams, closeSideout }: TeamsListProps) {
  const navigate = useNavigate();
  // split teams into owners and members groupings
  const members = teams.filter(team => !team.isOwner);
  const owners = teams.filter(team => team.isOwner);

  const openTeamClicked = (team: TeamAffiliations) => {
    closeSideout && closeSideout(); // close sideout if it exists
    navigate('/manage-team', {
      state: { selectedTeam: team }
    });
  }

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
                <li key={index} className="p-2 w-5/6 mx-auto">
                  <RoundedLabel text={team.teamName}/>
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
              <li key={index} className="p-2 w-5/6 mx-auto">
                <div className='flex gap-2 items-center justify-center'>
                  <RoundedLabel text={team.teamName} borderColour='border-green-500' clickAction={() => openTeamClicked(team)} />
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