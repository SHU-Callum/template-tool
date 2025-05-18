package uk.uni.callum.templateTool.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "team_member")
@Data
public class TeamMember {

    @EmbeddedId
    private TeamMemberId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Employee userId;

    @ManyToOne
    @MapsId("teamId")
    @JoinColumn(name = "team_id", referencedColumnName = "id", nullable = false)
    private Team teamId;

    @ManyToOne
    @JoinColumn(name = "permission_role", referencedColumnName = "id", nullable = false)
    private MemberRole permissionRole;
}