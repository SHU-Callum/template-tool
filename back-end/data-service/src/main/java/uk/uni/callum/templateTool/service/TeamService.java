package uk.uni.callum.templateTool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.uni.callum.templateTool.dto.TeamDTO;
import uk.uni.callum.templateTool.dto.TeamMemberDTO;
import uk.uni.callum.templateTool.model.Employee;
import uk.uni.callum.templateTool.model.MemberRole;
import uk.uni.callum.templateTool.model.Team;
import uk.uni.callum.templateTool.model.TeamMember;
import uk.uni.callum.templateTool.model.TeamMemberId;
import uk.uni.callum.templateTool.repository.TeamMemberRepository;
import uk.uni.callum.templateTool.repository.TeamRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private TeamRepository teamRepository;

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

    public Team findTeamById(long teamId) {
        return teamRepository.findById(teamId);
    }

    public Optional<TeamMember> findTeamMemberByEmail(String email) {
        return teamMemberRepository.findByUserId_Email(email);
    }

    public List<TeamMemberDTO> findTeamMembersByTeamId(long teamId) {
        return teamMemberRepository.findTeamMembersByTeamId(teamId);
    }

    public Optional<TeamMember> findTeamMemberByUserIdAndTeamId(long userId, long teamId) {
        return teamMemberRepository.findByUserId_IdAndTeamId_Id(userId, teamId);
    }

    public List<TeamMemberDTO> setTeamMemberPermission(TeamMember teamMember) {
        MemberRole ownerRole = new MemberRole();
        ownerRole.setId(3L); // 3 is the ID for "OWNER"
        teamMember.setPermissionRole(ownerRole);
        teamMemberRepository.save(teamMember);
        // Return updated list of team members
        return teamMemberRepository.findTeamMembersByTeamId(teamMember.getTeamId().getId());
    }

    public TeamMemberDTO addTeamMember(Employee employee, long teamId) {
        TeamMemberId teamMemberId = new TeamMemberId();
        teamMemberId.setUserId(employee.getId());
        teamMemberId.setTeamId(teamId);

        TeamMember teamMember = new TeamMember();
        teamMember.setId(teamMemberId);
        teamMember.setUserId(employee);
        teamMember.setTeamId(teamRepository.findById(teamId));
        MemberRole memberRole = new MemberRole();
        memberRole.setId(1L); // 1 is the ID for "MEMBER"
        teamMember.setPermissionRole(memberRole);

        TeamMember savedMember =  teamMemberRepository.save(teamMember);
        return new TeamMemberDTO(
            savedMember.getUserId().getId(),
            savedMember.getUserId().getEmail(),
            savedMember.getUserId().getDisplayName(),
            savedMember.getPermissionRole().getPermission());
    }
}