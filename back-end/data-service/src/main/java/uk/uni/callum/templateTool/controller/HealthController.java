package uk.uni.callum.templateTool.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping(value = "/")
    private String getHealth() {
        return "Data Service Health is OK";
    }
}
