package uk.uni.callum.templateTool.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping(value = "/")
    @Operation(summary = "Health Check", description = "Returns the health status of the service")
    private String getHealth() {
        return "Data Service Health is OK";
    }
}
