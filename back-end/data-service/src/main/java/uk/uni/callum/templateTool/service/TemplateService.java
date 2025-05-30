package uk.uni.callum.templateTool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.uni.callum.templateTool.model.Template;
import uk.uni.callum.templateTool.model.requestParams.FindTemplateParams;
import uk.uni.callum.templateTool.repository.TemplateRepository;
import java.util.List;

@Service
public class TemplateService {

    @Autowired
    private TemplateRepository templateRepository;

    /**
     * Find template by template ID.
     *
     * @param templateId The ID of the template to find.
     * @return The template with the specified ID, or null if not found.
     */
    public Template findTemplateById(Long templateId) {
        return templateRepository.findById(templateId).orElse(null);

    }

    /**
     * Find templates by team IDs.
     *
     * @param teamId Array of team IDs to search for templates.
     * @return List of templates associated with the specified team IDs.
     */
    public List<Template> findTemplatesByTeamIdIn(String[] teamId) {
        return templateRepository.findByTeamIdIn(teamId);
    }

    /**
     * Find templates based on search parameters.
     *
     * @param searchParams The parameters to filter templates.
     * @return List of templates matching the search criteria.
     */
    public List<Template> findTemplatesByParams(FindTemplateParams searchParams) {
       return templateRepository.findByCriteria(searchParams.getSearchText(), searchParams.getTeamIds(), searchParams.isIncludeViewOnly(), searchParams.getUserId());
    }

    /**
     * Save a template to the repository.
     *
     * @param template The template to save.
     * @return The saved template.
     */
    public Template saveTemplate(Template template) {
        return templateRepository.save(template);
    }

    /**
     * Update an existing template.
     *
     * @param template The template to update.
     * @return The updated template.
     */
    public Template updateTemplate(Template template) {
        return templateRepository.save(template);
    }

    /**
     * Delete a template by its ID.
     *
     * @param templateId The ID of the template to delete.
     */
    public void deleteTemplate(Long templateId) {
        templateRepository.deleteById(templateId);
    }
}