package uk.uni.callum.templateTool.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "template")
@Data
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String detail;

    private String content;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "team_id")
    private Long teamId;

    private boolean editable;

    @Column(name = "last_amend_date")
    private LocalDateTime lastAmendDate;
}
