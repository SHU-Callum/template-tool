package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.uni.callum.templateTool.model.TeamMember;
import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMember, String> {

    List<TeamMember> findByUserId_Id(long userId);

    List<TeamMember> findByTeamId_IdAndPermissionRole_Permission(long teamId, String permission);
}