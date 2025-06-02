package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.uni.callum.templateTool.model.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, String> {
    Team findById(Long id);
}
