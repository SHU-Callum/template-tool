package uk.uni.callum.templateTool.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import uk.uni.callum.templateTool.model.Template;
import uk.uni.callum.templateTool.model.requestParams.FindTemplateParams;
import uk.uni.callum.templateTool.repository.TemplateRepository;
import uk.uni.callum.templateTool.service.TemplateService;
import uk.uni.callum.templateTool.utils.Encryption;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@EnableMethodSecurity
@RestController
@RequestMapping(value = "/templates")
public class TemplateController {

    @Autowired
    private TemplateService templateService;

    @Autowired
    private Encryption encryption;

    @GetMapping
    @Operation(summary = "Find templates by params", description = "Return list of templates containing the search criteria")
    public ResponseEntity<?> searchTemplatesByParams(@RequestParam(value = "search", required = true) String encryptedSearch, @RequestHeader("encryption-iv") String iv) {
        if (encryptedSearch != null && !encryptedSearch.isEmpty()) {
            try {
                String decodedParams = URLDecoder.decode(encryptedSearch, StandardCharsets.UTF_8);
                String decryptedParams = encryption.decrypt(decodedParams, iv);
                // Convert to JSON object
                FindTemplateParams searchParams = new ObjectMapper().readValue(decryptedParams, FindTemplateParams.class);
                List<Template> results = templateService.findTemplatesByParams(searchParams);
                if (results.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No templates found for the search criteria");
                }
                return ResponseEntity.status(HttpStatus.OK).body(results);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid search parameters - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Search parameter is required");
        }
    }

    @GetMapping(value = "all")
    @Operation(summary = "Find all templates by user teams", description = "Return list of templates for a user id")
    public ResponseEntity<?> getTemplatesByTeams(@RequestParam(value = "teams") String eTeamIds, @RequestHeader("encryption-iv") String iv) {
        if (eTeamIds != null && !eTeamIds.isEmpty()) {
            try {
                String decodedTeamIds = URLDecoder.decode(eTeamIds, StandardCharsets.UTF_8);
                String decryptedTeamIds = encryption.decrypt(decodedTeamIds, iv);
                // Convert to JSON array
                String[] teamIds = new ObjectMapper().readValue(decryptedTeamIds, String[].class);
                // Search for templates by team ids
                List<Template> results = templateService.findTemplatesByTeamIdIn(teamIds);
                if (results.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No templates found for the team IDs: " + eTeamIds);
                }
                return ResponseEntity.status(HttpStatus.OK).body(results);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid team IDs - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e + e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Team ID parameter is required");
        }
    }
}
