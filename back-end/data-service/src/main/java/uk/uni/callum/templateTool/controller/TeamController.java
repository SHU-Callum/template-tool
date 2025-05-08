package uk.uni.callum.templateTool.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import uk.uni.callum.templateTool.model.Team;
import uk.uni.callum.templateTool.repository.TeamRepository;
import uk.uni.callum.templateTool.utils.Encryption;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@EnableMethodSecurity
@RestController
@RequestMapping(value = "/teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private Encryption encryption;

    @GetMapping("/all")
    @Operation(summary = "Find teams by user id", description = "Return list of teams for a user id")
    public ResponseEntity<?> getUserTeams(@RequestParam(value = "user") String eUserId, @RequestHeader("encryption-iv") String iv) {
        if (eUserId != null) {
            try {
                String decodedUserId = URLDecoder.decode(eUserId, StandardCharsets.UTF_8);
                String decryptedUserId = encryption.decrypt(decodedUserId, iv);
                // Search for teams by user id
                List<Team> teams = teamRepository.findByUserId(decryptedUserId);
                if (teams.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No teams found for the user id: " + decryptedUserId);
                }
                return ResponseEntity.status(HttpStatus.OK).body(teams);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user id - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user ID was sent");
        }
    }
}