package uk.uni.callum.templateTool.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "team_name")
    private String teamName;
}
