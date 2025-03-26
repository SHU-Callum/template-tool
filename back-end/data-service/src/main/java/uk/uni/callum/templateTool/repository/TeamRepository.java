package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uk.uni.callum.templateTool.model.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, String> {
    @Query("SELECT t FROM Team t WHERE t.id IN " +
            "(SELECT tm.teamId FROM TeamMember tm WHERE tm.userId = :userId)")
    List<Team> findByUserId(@Param("userId") String userId);
}
