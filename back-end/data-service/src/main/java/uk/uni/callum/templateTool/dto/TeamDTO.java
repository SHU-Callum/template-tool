package uk.uni.callum.templateTool.dto;

import lombok.Data;

// DTO for Team entity is used for combining Team info with member roles
@Data
public class TeamDTO {
    private long id;
    private String teamName;
    private long[] ownerIds; // ID of the team member with "OWNER" role
}