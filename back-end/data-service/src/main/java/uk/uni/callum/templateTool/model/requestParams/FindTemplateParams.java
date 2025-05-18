package uk.uni.callum.templateTool.model.requestParams;

import lombok.Data;

@Data
public class FindTemplateParams {
    private String searchText;
    private int[] teamIds;
    private boolean includeViewOnly;
    private long userId;
}