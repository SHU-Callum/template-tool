package uk.uni.callum.templateTool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.uni.callum.templateTool.dto.TeamDTO;
import uk.uni.callum.templateTool.model.Team;
import uk.uni.callum.templateTool.model.TeamMember;
import uk.uni.callum.templateTool.repository.TeamMemberRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    /**
     * Find teams by user ID.
     *
     * @param userId The ID of the user to find teams for.
     * @return List of TeamDTO objects containing team information and owner IDs.
     */
    public List<TeamDTO> findTeamsByUserId(long userId) {
        List<TeamMember> teamMembers = teamMemberRepository.findByUserId_Id(userId);
        return teamMembers.stream()
        .map(teamMember -> {
            Team team = teamMember.getTeamId();

            List<TeamMember> ownerMember = teamMemberRepository.findByTeamId_IdAndPermissionRole_Permission(team.getId(), "OWNER");
            long[] ownerIds = ownerMember.stream()
                    .mapToLong(tm -> tm.getUserId().getId()).toArray();

            TeamDTO teamDTO = new TeamDTO();
            teamDTO.setId(team.getId());
            teamDTO.setTeamName(team.getTeamName());
            teamDTO.setOwnerIds(ownerIds);

            return teamDTO;
        }).collect(Collectors.toList());
    }
}