package uk.uni.callum.templateTool.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import uk.uni.callum.templateTool.dto.TeamDTO;
import uk.uni.callum.templateTool.dto.TeamMemberDTO;
import uk.uni.callum.templateTool.model.Employee;
import uk.uni.callum.templateTool.model.Team;
import uk.uni.callum.templateTool.model.TeamMember;
import uk.uni.callum.templateTool.model.requestParams.AddMemberParams;
import uk.uni.callum.templateTool.model.requestParams.CreateTeamParams;
import uk.uni.callum.templateTool.model.requestParams.UpdateMemberPermsParams;
import uk.uni.callum.templateTool.service.EmployeeService;
import uk.uni.callum.templateTool.service.TeamService;
import uk.uni.callum.templateTool.utils.Encryption;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@EnableMethodSecurity
@RestController
@RequestMapping(value = "/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private Encryption encryption;

    /**
     * Endpoint to find teams by user ID.
     * Returns a list of teams associated with the provided user ID.
     *
     * @param eUserId The encrypted user ID to search for.
     * @param iv      The initialization vector for decryption.
     * @return ResponseEntity with the list of teams or an error message.
     */
    @GetMapping("/all")
    @Operation(summary = "Find teams by user id", description = "Return list of teams for a user id")
    public ResponseEntity<?> getUserTeams(@RequestParam(value = "user") String eUserId, @RequestHeader("encryption-iv") String iv) {
        if (eUserId != null) {
            try {
                String decodedUserId = URLDecoder.decode(eUserId, StandardCharsets.UTF_8);
                String decryptedUserId = encryption.decrypt(decodedUserId, iv);
                Long formattedDecryptedUserId = null;
                formattedDecryptedUserId = Long.parseLong(encryption.decrypt(decodedUserId, iv));

                // Search for teams by user id
                List<TeamDTO> teams = teamService.findTeamsByUserId(formattedDecryptedUserId);
                if (teams.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No teams found for the user id: " + decryptedUserId);
                }
                return ResponseEntity.status(HttpStatus.OK).body(teams);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user id - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user ID was sent");
        }
    }

    /**
     * Endpoint to find team members by team ID.
     * Returns a list of employees with permissions for the specified team ID.
     *
     * @param eTeamId The encrypted team ID to search for.
     * @param iv      The initialization vector for decryption.
     * @return ResponseEntity with the list of team members or an error message.
     */
    @GetMapping("/users")
    @Operation(summary = "Find teams by user id", description = "Return list of employees with permissions for a team id")
    public ResponseEntity<?> getMembersByTeam(@RequestParam("team") String eTeamId, @RequestHeader("encryption-iv") String iv) {
        if (eTeamId != null) {
            try {
                String decodedTeamId = URLDecoder.decode(eTeamId, StandardCharsets.UTF_8);
                String decryptedTeamId = encryption.decrypt(decodedTeamId, iv);
                Long formattedDecryptedTeamId = null;
                formattedDecryptedTeamId = Long.parseLong(decryptedTeamId);

                Team team = teamService.findTeamById(formattedDecryptedTeamId);
                if(team == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found");
                }
                // Search for team members by team id
                List<TeamMemberDTO> teamMembers = teamService.findTeamMembersByTeamId(formattedDecryptedTeamId);
                if (teamMembers.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users found");
                }
                return ResponseEntity.status(HttpStatus.OK).body(teamMembers);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user id - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Team ID was sent");
        }
    }

    /**
     * Endpoint to add a new member to a team.
     * Returns the added user if successful, or an error message if the user does not exist or is already a member.
     *
     * @param iv The initialization vector for decryption.
     * @param encryptedMember The encrypted member details to add.
     * @return ResponseEntity with the added team member or an error message.
     */
    @PostMapping("/add")
    @Operation(summary = "Add a new member to team", description = "Add a new member to a team if found and return the added user")
    public ResponseEntity<?> addTeamMember(@RequestHeader("encryption-iv") String iv, @RequestBody String encryptedMember) {
        if (encryptedMember != null) {
            try {
                String decodedMember = URLDecoder.decode(encryptedMember, StandardCharsets.UTF_8);
                String decryptedMember = encryption.decrypt(decodedMember, iv);
                // Convert the decrypted JSON string to UpdateMemberPermsParams object
                AddMemberParams memberToAdd = new ObjectMapper().readValue(decryptedMember, AddMemberParams.class);
                long formattedTeamId = Long.parseLong(memberToAdd.getTeamId());

                Optional<Employee> existingUser = employeeService.findEmployeeByEmail(memberToAdd.getEmail());
                if(existingUser.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist");
                }

                // Check if the user is already a member of the team
                Optional<TeamMember> existingMember = teamService.findTeamMemberByUserIdAndTeamId(existingUser.get().getId(), formattedTeamId);
                if (existingMember.isPresent()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already a member of the team");
                }

                // Add the new team member
                TeamMemberDTO teamMember = teamService.addTeamMember(existingUser.get(), formattedTeamId);
                if (teamMember == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not added to the team");
                }
                return ResponseEntity.status(HttpStatus.OK).body(teamMember);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid team member params - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Team member was sent");
        }
    }

    /**
     * Endpoint to create a new team.
     * Returns the newly created team if successful, or an error message if the user does not exist or the team already exists.
     *
     * @param iv The initialization vector for decryption.
     * @param encryptedMember The encrypted team creation details.
     * @return ResponseEntity with the new team or an error message.
     */
    @PostMapping("/create")
    @Operation(summary = "Create a new team", description = "Create a new team with user as the default owner and return the new team")
    public ResponseEntity<?> createTeam(@RequestHeader("encryption-iv") String iv, @RequestBody String encryptedMember) {
        if (encryptedMember != null) {
            try {
                String decodedTeamCreate = URLDecoder.decode(encryptedMember, StandardCharsets.UTF_8);
                String decryptedTeamCreate = encryption.decrypt(decodedTeamCreate, iv);
                // Convert the decrypted JSON string to UpdateMemberPermsParams object
                CreateTeamParams teamToCreate = new ObjectMapper().readValue(decryptedTeamCreate, CreateTeamParams.class);
                long formattedOwnerId = Long.parseLong(teamToCreate.getOwnerId());

                Optional<Employee> existingUser = employeeService.findEmployeeByUserId(formattedOwnerId);
                if(existingUser.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist");
                }

                // Check if the user is already a member of the team
                Optional<Team> existingTeam = teamService.findTeamByName(teamToCreate.getTeamName());
                if (existingTeam.isPresent()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Team already exists");
                }

                // Create the new team
                Team newTeam = teamService.createTeam(teamToCreate.getTeamName());
                if (newTeam == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create team");
                }

                TeamMember teamMember = teamService.setDefaultTeamOwner(newTeam, existingUser.get());
                if (teamMember == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to set team owner");
                }

                // Return the new team
                TeamDTO teamDTO = new TeamDTO();
                teamDTO.setId(newTeam.getId());
                teamDTO.setTeamName(newTeam.getTeamName());
                teamDTO.setOwnerIds(new long[]{(formattedOwnerId)});

                return ResponseEntity.status(HttpStatus.CREATED).body(teamDTO);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Create Team params - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Team Creation data was sent");
        }
    }

    /**
     * Endpoint to update team member permission to OWNER.
     * Returns an updated list of employees with permissions for the specified team ID.
     * @param iv The initialization vector for decryption.
     * @param encryptedMember The encrypted team member ID to update.
     * @return ResponseEntity with the updated list of team members or an error message.
     */
    @PutMapping("/promote")
    @Operation(summary = "Update a team member to OWNER", description = "Update a team member permission and return an updated list of employee permissions for a team id")
    public ResponseEntity<?> updateTeamMemberPermission(@RequestHeader("encryption-iv") String iv, @RequestBody String encryptedMember) {
        if (encryptedMember != null) {
            try {
                String decodedMemberPerms = URLDecoder.decode(encryptedMember, StandardCharsets.UTF_8);
                String decryptedMemberPerms = encryption.decrypt(decodedMemberPerms, iv);
                // Convert the decrypted JSON string to UpdateMemberPermsParams object
                UpdateMemberPermsParams memberToUpdate = new ObjectMapper().readValue(decryptedMemberPerms, UpdateMemberPermsParams.class);
                long formattedUserId = Long.parseLong(memberToUpdate.getUserId());
                long formattedTeamId = Long.parseLong(memberToUpdate.getTeamId());

                Optional<TeamMember> teamMember = teamService.findTeamMemberByUserIdAndTeamId(formattedUserId, formattedTeamId);
                if(teamMember.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team member not found");
                }
                // Update the team member's permission to OWNER
                List<TeamMemberDTO> teamMembers = teamService.setTeamMemberPermission(teamMember.get());
                if (teamMembers.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users found");
                } else if (teamMembers.stream().anyMatch(tm -> tm.getId() == formattedUserId && !tm.isOwner())) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to promote to OWNER");
                }
                return ResponseEntity.status(HttpStatus.OK).body(teamMembers);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid team member params - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Team member was sent");
        }
    }
}