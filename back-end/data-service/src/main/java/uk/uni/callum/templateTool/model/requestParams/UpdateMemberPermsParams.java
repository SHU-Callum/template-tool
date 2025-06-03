package uk.uni.callum.templateTool.model.requestParams;

import lombok.Data;

@Data
public class UpdateMemberPermsParams {
    private String userId;
    private String teamId;
}