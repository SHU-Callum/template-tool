package uk.uni.callum.templateTool.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import uk.uni.callum.templateTool.model.Template;
import uk.uni.callum.templateTool.utils.QueryBuilder;
import java.util.List;

public class TemplateRepositoryImpl implements TemplateRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Custom implementation of the findByCriteria method to search templates based on various criteria.
     *
     * @param searchText The text to search for in the title or detail of the templates.
     * @param teamIds An array of team IDs to filter the templates by.
     * @param includeViewOnly If true, includes templates that are view-only.
     * @param userId The ID of the user making the request, used for permission checks.
     * @return A list of templates matching the criteria.
     */
    @Override
    public List<Template> findByCriteria(String searchText, int[] teamIds, boolean includeViewOnly, long userId) {
        // Implement the custom query logic here
        QueryBuilder<Template> builder = new QueryBuilder<>(entityManager, Template.class);
        builder.selectAllFromEntity()
                .where().fieldIntIn("teamId", teamIds);
        if(searchText != null && !searchText.isEmpty()) {
            builder.and().likeText(searchText, "title", "detail");
        }
        if (!includeViewOnly) {
            builder.and().openParen().fieldEquals("editable", true)
                    .or().fieldEquals("ownerId", userId)
                    .or().subQueryIn("teamId",
                            "SELECT tm.teamId.id FROM TeamMember tm WHERE tm.userId.id = " + userId +
                            " AND tm.permissionRole.id = (SELECT mr.id FROM MemberRole mr WHERE permission = 'OWNER')")
                    .closeParen();
        }
        return builder.build().getResultList();
    }
}