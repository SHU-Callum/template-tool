package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uk.uni.callum.templateTool.dto.TeamMemberDTO;
import uk.uni.callum.templateTool.model.TeamMember;
import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository extends JpaRepository<TeamMember, String> {

    List<TeamMember> findByUserId_Id(long userId);

    Optional<TeamMember> findByUserId_IdAndTeamId_Id (long userId, long teamId);

    @Query("SELECT new uk.uni.callum.templateTool.dto.TeamMemberDTO(e.id, e.email, e.displayName, t.permissionRole.permission) " +
            "FROM TeamMember t JOIN t.userId e WHERE t.teamId.id = :teamId")
    List<TeamMemberDTO> findTeamMembersByTeamId(@Param("teamId") long teamId);

    List<TeamMember> findByTeamId_IdAndPermissionRole_Permission(long teamId, String permission);
}