package uk.uni.callum.templateTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uk.uni.callum.templateTool.model.Template;
import uk.uni.callum.templateTool.repository.TemplateRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/templates")
public class TemplateController {

    @Autowired
    private TemplateRepository templateRepository;

    @GetMapping(value = "/all")
    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    @GetMapping
    public ResponseEntity<?> searchTemplatesByText(@RequestParam(value = "search", required = false) String search) {
        if (search != null && !search.isEmpty()) {
            List<Template> results = templateRepository.findByTitleOrDetail(search);
            if (results.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No templates found for the search term: " + search);
            }
            return ResponseEntity.status(HttpStatus.OK).body(results);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Search parameter is required");
        }
    }
}
