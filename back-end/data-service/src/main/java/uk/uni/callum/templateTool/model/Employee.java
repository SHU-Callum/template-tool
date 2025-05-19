package uk.uni.callum.templateTool.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Employee {
    public Employee(String email, String displayName, String keycloakId) {
        this.email = email;
        this.displayName = displayName;
        this.keycloakId = keycloakId;
    }

    public Employee() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "keycloak_id")
    private String keycloakId;
}
