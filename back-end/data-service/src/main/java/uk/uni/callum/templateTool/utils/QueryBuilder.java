package uk.uni.callum.templateTool.utils;

import jakarta.persistence.*;

public class QueryBuilder<T> {
    private final StringBuilder query;
    private final EntityManager entityManager;
    private final Class<T> entityClass;

    /**
     * Constructs a QueryBuilder for the specified entity class.
     *
     * @param entityManager the EntityManager to use for creating queries
     * @param entityClass   the class of the entity to build queries for
     */
    public QueryBuilder(EntityManager entityManager, Class<T> entityClass) {
        this.entityManager = entityManager;
        this.entityClass = entityClass;
        this.query = new StringBuilder();
    }

    /**
     * Starts a new JPQL query to select all fields from the entity class.
     *
     * @return this QueryBuilder instance for method chaining
     */
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

    /**
     * Appends a FROM clause to the query for the specified entity class.
     * @param table the entity class representing the table to select from
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> from(Class<T> table) {
        // Get table name from @Table annotation
        Table tableAnnotation = table.getAnnotation(Table.class);
        String tableName = (tableAnnotation != null) ? tableAnnotation.name() : table.getSimpleName();
        query.append(" FROM ").append(table);
        return this;
    }

    /**
     * Appends a AND clause to the query.
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> and() {
        query.append(" AND ");
        return this;
    }

    /**
     * Appends an OR clause to the query.
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> or() {
        query.append(" OR ");
        return this;
    }

    /**
     * Appends a WHERE clause to the query.
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> where() {
        query.append(" WHERE ");
        return this;
    }

    /**
     * Appends a '(' to the query to start a subquery or grouping.
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> openParen() {
        query.append("(");
        return this;
    }

    /**
     * Appends a ')' to the query to close a subquery or grouping.
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> closeParen() {
        query.append(")");
        return this;
    }

    /**
     * Appends a LIKE clause to the query for text fields.
     * @param value the value to search for
     * @param fields the fields to apply the LIKE condition to
     * @return this QueryBuilder instance for method chaining
     */
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

    /**
     * Appends a field contains check to the query for integer fields.
     * @param field the field to check
     * @param values the integer values to check against
     * @return this QueryBuilder instance for method chaining
     */
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

    /**
     * Appends a field equals check to the query.
     * @param field the field to check
     * @param value the value to check against
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> fieldEquals(String field, Object value) {
        query.append(field).append(" = ").append(value);
        return this;
    }

    /**
     * Appends a subquery that checks if a field is in the results of another query.
     * @param field the field to check
     * @param subQuery the subquery to use for the IN clause
     * @return this QueryBuilder instance for method chaining
     */
    public QueryBuilder<T> subQueryIn(String field, String subQuery) {
         query.append(field).append(" IN (").append(subQuery).append(")");
         return this;
    }

    /**
     * Builds the final TypedQuery based on the constructed JPQL query.
     *
     * @return a TypedQuery of type T
     */
    public TypedQuery<T> build() {
        System.out.println("q: " + query);
        return entityManager.createQuery(query.toString(), entityClass);
    }
}