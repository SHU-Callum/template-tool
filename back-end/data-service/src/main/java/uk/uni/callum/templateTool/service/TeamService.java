package uk.uni.callum.templateTool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.uni.callum.templateTool.dto.TeamDTO;
import uk.uni.callum.templateTool.dto.TeamMemberDTO;
import uk.uni.callum.templateTool.model.Employee;
import uk.uni.callum.templateTool.model.MemberRole;
import uk.uni.callum.templateTool.model.Team;
import uk.uni.callum.templateTool.model.TeamMember;
import uk.uni.callum.templateTool.model.TeamMemberId;
import uk.uni.callum.templateTool.repository.TeamMemberRepository;
import uk.uni.callum.templateTool.repository.TeamRepository;
import uk.uni.callum.templateTool.repository.TemplateRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TemplateRepository templateRepository;

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

    /**
     * Find a team by its ID.
     *
     * @param teamId The ID of the team to find.
     * @return The Team object if found, or null if not found.
     */
    public Team findTeamById(long teamId) {
        return teamRepository.findById(teamId);
    }

    /**
     * Find a team by its name.
     *
     * @param teamName The name of the team to find.
     * @return An Optional containing the Team if found, or empty if not found.
     */
    public Optional<Team> findTeamByName(String teamName) {
        return teamRepository.findByTeamName(teamName);
    }

    /**
     * Find all team members by team ID.
     *
     * @param teamId The ID of the team to find members for.
     * @return A list of TeamMemberDTO objects containing member information.
     */
    public List<TeamMemberDTO> findTeamMembersByTeamId(long teamId) {
        return teamMemberRepository.findTeamMembersByTeamId(teamId);
    }

    /**
     * Find a team member by user ID and team ID.
     *
     * @param userId The ID of the user to find.
     * @param teamId The ID of the team to find the member in.
     * @return An Optional containing the TeamMember if found, or empty if not found.
     */
    public Optional<TeamMember> findTeamMemberByUserIdAndTeamId(long userId, long teamId) {
        return teamMemberRepository.findByUserId_IdAndTeamId_Id(userId, teamId);
    }

    /**
     * Set the permission role of a team member to "OWNER".
     *
     * @param teamMember The TeamMember object to update.
     * @return A list of TeamMemberDTO objects containing updated member information.
     */
    public List<TeamMemberDTO> setTeamMemberPermission(TeamMember teamMember) {
        MemberRole ownerRole = new MemberRole();
        ownerRole.setId(3L); // 3 is the ID for "OWNER"
        teamMember.setPermissionRole(ownerRole);
        teamMemberRepository.save(teamMember);
        // Return updated list of team members
        return teamMemberRepository.findTeamMembersByTeamId(teamMember.getTeamId().getId());
    }

    /**
     * Add a team member to a team.
     *
     * @param employee The Employee object representing the team member to add.
     * @param teamId The ID of the team to add the member to.
     * @return A TeamMemberDTO object containing the added member's information.
     */
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

/**
     * Create a new team with the specified name.
     *
     * @param teamName The name of the team to create.
     * @return The created Team object.
     */
    public Team createTeam(String teamName) {
        Team newTeam = new Team();
        newTeam.setTeamName(teamName); // ID is auto-generated by the database
        return teamRepository.save(newTeam);
    }

    /**
     * Delete a team and all associated data.
     * @param team The Team object to delete.
     * @return true if the deletion was successful, false otherwise.
     */
    @Transactional
    public boolean deleteTeam(Team team) {
        // delete all templates associated with the team
        templateRepository.deleteByTeamId(team.getId());
        // delete all team members associated with the team
        teamMemberRepository.deleteByTeamId_Id(team.getId());
        // delete the team itself
        teamRepository.delete(team);
        return true;
    }

    /**
     * Set the default team owner for a team.
     *
     * @param team The Team object to set the owner for.
     * @param owner The Employee object representing the new owner.
     * @return The created TeamMember object with OWNER role.
     */
    public TeamMember setDefaultTeamOwner(Team team, Employee owner) {
        TeamMember teamMember = new TeamMember();
        teamMember.setUserId(owner);
        teamMember.setTeamId(team);

        MemberRole ownerRole = new MemberRole();
        ownerRole.setId(3L); // 3 is the ID for "OWNER"
        teamMember.setPermissionRole(ownerRole);

        TeamMemberId teamMemberId = new TeamMemberId();
        teamMemberId.setUserId(owner.getId());
        teamMemberId.setTeamId(team.getId());
        teamMember.setId(teamMemberId);

        return teamMemberRepository.save(teamMember);
    }
}