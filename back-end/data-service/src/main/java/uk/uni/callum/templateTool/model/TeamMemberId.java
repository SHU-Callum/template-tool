package uk.uni.callum.templateTool.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Embeddable
@Data
public class TeamMemberId implements Serializable {
    @Column(name = "user_id")
    private long userId;

    @Column(name = "team_id")
    private long teamId;
}