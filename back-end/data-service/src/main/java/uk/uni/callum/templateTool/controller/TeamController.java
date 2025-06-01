package uk.uni.callum.templateTool.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import uk.uni.callum.templateTool.dto.TeamDTO;
import uk.uni.callum.templateTool.dto.TeamMemberDTO;
import uk.uni.callum.templateTool.model.Team;
import uk.uni.callum.templateTool.service.TeamService;
import uk.uni.callum.templateTool.utils.Encryption;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@EnableMethodSecurity
@RestController
@RequestMapping(value = "/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

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
}