package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uk.uni.callum.templateTool.model.Template;

import java.util.List;

public interface TemplateRepository extends JpaRepository<Template, Long>, TemplateRepositoryCustom {
    List<Template> findByTeamIdIn(String[] teamId);
}