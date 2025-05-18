package uk.uni.callum.templateTool.utils;

import jakarta.persistence.*;

public class QueryBuilder<T> {
    private final StringBuilder query;
    private final EntityManager entityManager;
    private final Class<T> entityClass;

    public QueryBuilder(EntityManager entityManager, Class<T> entityClass) {
        this.entityManager = entityManager;
        this.entityClass = entityClass;
        this.query = new StringBuilder();
    }

    public QueryBuilder<T> selectAllFromEntity() {
        if (!entityClass.isAnnotationPresent(Entity.class)) {
            throw new IllegalArgumentException("Class must be annotated with @Entity");
        }
        Table tableAnnotation = entityClass.getAnnotation(Table.class);
        String tableName = /*(tableAnnotation != null) ? tableAnnotation.name() :*/ entityClass.getSimpleName();

        // @Column and @Table annotations are built into JPQL query
        String entityName = entityClass.getSimpleName();
        query.append("SELECT e FROM ").append(entityName).append(" e");
        return this;
    }

    public QueryBuilder<T> from(Class<T> table) {
        // Get table name from @Table annotation
        Table tableAnnotation = table.getAnnotation(Table.class);
        String tableName = (tableAnnotation != null) ? tableAnnotation.name() : table.getSimpleName();
        query.append(" FROM ").append(table);
        return this;
    }

    public QueryBuilder<T> and() {
        query.append(" AND ");
        return this;
    }

    public QueryBuilder<T> or() {
        query.append(" OR ");
        return this;
    }

    public QueryBuilder<T> where() {
        query.append(" WHERE ");
        return this;
    }

    public QueryBuilder<T> openParen() {
        query.append("(");
        return this;
    }

    public QueryBuilder<T> closeParen() {
        query.append(")");
        return this;
    }

    public QueryBuilder<T> likeText(String value, String... fields) {
        if (fields.length == 0) {
            throw new IllegalArgumentException("At least one field must be specified");
        }
        query.append("(");
        for (String field : fields) {
            query.append(field).append(" LIKE '%").append(value).append("%'").append(" OR ");
        }
        query.setLength(query.length() - 4); // Remove last " OR "
        query.append(")");
        return this;
    }

    public QueryBuilder<T> fieldIntIn(String field, int[] values) {
        if (values.length == 0) {
            throw new IllegalArgumentException("At least one value must be specified");
        }
        query.append(field).append(" IN (");
        for (Object value : values) {
            query.append(value).append(", ");
        }
        query.setLength(query.length() - 2); // Remove last comma and space
        query.append(")");
        return this;
    }

    public QueryBuilder<T> fieldEquals(String field, Object value) {
        query.append(field).append(" = ").append(value);
        return this;
    }

    public QueryBuilder<T> subQueryIn(String field, String subQuery) {
         query.append(field).append(" IN (").append(subQuery).append(")");
         return this;
    }

    public TypedQuery<T> build() {
        System.out.println("q: " + query);
        TypedQuery<T> typedQuery = entityManager.createQuery(query.toString(), entityClass);
        return typedQuery;
    }
}