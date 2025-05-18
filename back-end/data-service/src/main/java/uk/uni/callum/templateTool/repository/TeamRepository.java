package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.uni.callum.templateTool.model.Team;

public interface TeamRepository extends JpaRepository<Team, String> {

}
