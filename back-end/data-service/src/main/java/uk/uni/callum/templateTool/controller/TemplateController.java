package uk.uni.callum.templateTool.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import uk.uni.callum.templateTool.model.Template;
import uk.uni.callum.templateTool.model.requestParams.FindTemplateParams;
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

    /**
     * Endpoint to find templates by search parameters.
     * @param encryptedSearch The encrypted search parameters to filter templates.
     * @param iv The initialization vector for decryption.
     * @return ResponseEntity with the list of templates or an error message
     */
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
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Search parameter is required");
        }
    }

    /**
     * Endpoint to find templates by team IDs.
     * @param eTeamIds The encrypted team IDs to search for templates.
     * @param iv The initialization vector for decryption.
     * @return ResponseEntity with the list of templates or an error message
     */
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
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Team ID parameter is required");
        }
    }

    /**
     * Endpoint to create a new template.
     * @param iv The initialization vector for decryption.
     * @param encryptedTemplate The encrypted template data to create.
     * @return ResponseEntity with the created template or an error message
     */
    @PostMapping(value = "create")
    @Operation(summary = "Create template", description = "Creates an new template. **Note:** When inspecting this request in Chrome DevTools, use **'View source'** in the Network tab to see the raw payload.")
    public ResponseEntity<?> createTemplate(@RequestHeader("encryption-iv") String iv, @RequestBody String encryptedTemplate) {
        if (encryptedTemplate != null && !encryptedTemplate.isEmpty()) {
            try {
                String decodedTemplate = URLDecoder.decode(encryptedTemplate, StandardCharsets.UTF_8);
                String decryptedTemplate = encryption.decrypt(decodedTemplate, iv);
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new JavaTimeModule());
                // Convert to JSON array
                Template templateToCreate = mapper.readValue(decryptedTemplate, Template.class);
                templateToCreate.setId(0); // This gets replaced by the database incrementing ID
                // Save the template
                Template savedTemplate = templateService.saveTemplate(templateToCreate);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedTemplate);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid template - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Template to create is required");
        }
    }

    /**
     * Endpoint to update an existing template.
     * @param id The ID of the template to update.
     * @param iv The initialization vector for decryption.
     * @param encryptedTemplate The encrypted template data to update.
     * @return ResponseEntity with the updated template or an error message
     */
    @PutMapping(value = "{id}/update")
    @Operation(summary = "Update template", description = "Saves an existing template. **Note:** When inspecting this request in Chrome DevTools, use **'View source'** in the Network tab to see the raw payload.")
    public ResponseEntity<?> updateTemplate(@PathVariable("id") Long id, @RequestHeader("encryption-iv") String iv, @RequestBody String encryptedTemplate) {
        if (id != null && encryptedTemplate != null && !encryptedTemplate.isEmpty()) {
            try {
                String decodedTemplate = URLDecoder.decode(encryptedTemplate, StandardCharsets.UTF_8);
                String decryptedTemplate = encryption.decrypt(decodedTemplate, iv);
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new JavaTimeModule());
                // Convert to JSON array
                Template templateToUpdate = mapper.readValue(decryptedTemplate, Template.class);
                // Check for existing template
                Template existingTemplate = templateService.findTemplateById(id);
                if (existingTemplate == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template not found");
                }
                // Update the existing template
                Template savedTemplate = templateService.saveTemplate(templateToUpdate);
                return ResponseEntity.status(HttpStatus.OK).body(savedTemplate);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid template - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Template to update is required");
        }
    }

    /**
     * Endpoint to delete a template by its ID.
     * @param id The ID of the template to delete.
     * @return ResponseEntity with the ID of the deleted template or an error message
     */
    @DeleteMapping(value = "{id}/delete")
    @Operation(summary = "Delete template", description = "Delete an existing template")
    public ResponseEntity<?> deleteTemplate(@PathVariable("id") Long id) {
        if (id != null) {
            try {
                // Check for existing template
                Template existingTemplate = templateService.findTemplateById(id);
                if (existingTemplate == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template not found");
                }
                // Update the existing template
                templateService.deleteTemplate(id);
                return ResponseEntity.status(HttpStatus.OK).body(id);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid template - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Template to update is required");
        }
    }
}
