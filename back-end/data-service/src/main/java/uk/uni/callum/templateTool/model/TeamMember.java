package uk.uni.callum.templateTool.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "team_member")
@Data
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "team_id", nullable = false)
    private Long teamId;

    @Column(name = "permission_role", nullable = false)
    private Integer permissionRole;
}