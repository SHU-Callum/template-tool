package uk.uni.callum.templateTool.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.uni.callum.templateTool.model.Employee;
import uk.uni.callum.templateTool.repository.EmployeeRepository;
import uk.uni.callum.templateTool.utils.Encryption;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping(value = "/user")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private Encryption encryption;

    @GetMapping()
    @Operation(summary = "Find employee by keycloak id", description = "Return employee for keycloak id")
    public ResponseEntity<?> getUserByKeycloakId(@RequestParam(value = "kcid") String kcid, @RequestHeader("encryption-iv") String iv) {
        if (kcid != null) {
            try {
                String decodedKcId = URLDecoder.decode(kcid, StandardCharsets.UTF_8);
                String decryptedKcId = encryption.decrypt(decodedKcId, iv);
                // Search for employee by keycloak id
                System.out.println(decryptedKcId);
                Employee employee = employeeRepository.findByKeycloakId(decryptedKcId);
                if (employee == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user found for the keycloak id: " + decryptedKcId);
                }
                return ResponseEntity.status(HttpStatus.OK).body(employee);
            } catch (IllegalArgumentException iae) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid keycloak id - Error: " + iae.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No keycloak ID was sent");
        }
    }
}