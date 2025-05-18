package uk.uni.callum.templateTool.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "member_role")
@Data
public class MemberRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String permission;
}