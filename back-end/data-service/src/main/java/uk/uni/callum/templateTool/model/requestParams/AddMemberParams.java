package uk.uni.callum.templateTool.model.requestParams;

import lombok.Data;

@Data
public class AddMemberParams {
    private String email;
    private String teamId;
}
