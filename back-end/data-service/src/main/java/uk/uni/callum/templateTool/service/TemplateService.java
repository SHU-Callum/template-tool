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

    public List<Template> findTemplatesByTeamIdIn(String[] teamId) {
        return templateRepository.findByTeamIdIn(teamId);
    }

    public List<Template> findTemplatesByParams(FindTemplateParams searchParams) {
       return templateRepository.findByCriteria(searchParams.getSearchText(), searchParams.getTeamIds(), searchParams.isIncludeViewOnly(), searchParams.getUserId());
    }
}