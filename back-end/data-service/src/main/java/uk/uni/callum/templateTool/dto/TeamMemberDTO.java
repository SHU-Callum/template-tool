package uk.uni.callum.templateTool.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// DTO for TeamMember entity is used for combining Employee info with member permissions
@Data
public class TeamMemberDTO {
    private long id;
    private String email;
    private String displayName;
    @JsonProperty("isOwner")
    private boolean isOwner;

    public TeamMemberDTO(Long id, String email, String displayName, String permission) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
        this.isOwner = "OWNER".equals(permission);
    }
}