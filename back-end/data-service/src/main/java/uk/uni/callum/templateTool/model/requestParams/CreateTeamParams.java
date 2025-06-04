package uk.uni.callum.templateTool.model.requestParams;

import lombok.Data;

@Data
public class CreateTeamParams {
    private String teamName;
    private String ownerId;
}
