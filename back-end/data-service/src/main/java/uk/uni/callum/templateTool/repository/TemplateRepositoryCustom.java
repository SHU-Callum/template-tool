package uk.uni.callum.templateTool.repository;

import uk.uni.callum.templateTool.model.Template;
import java.util.List;

public interface TemplateRepositoryCustom {
    List<Template> findByCriteria(String searchText, int[] teamIds, boolean includeViewOnly, long userId);
}