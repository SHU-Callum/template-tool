package uk.uni.callum.templateTool.service;

import jakarta.ws.rs.NotFoundException;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class KeycloakService {

    @Value("${keycloak.auth-server-url}")
    private String authServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.username}")
    private String username;

    @Value("${keycloak.password}")
    private String password;

    private Keycloak getKeycloakInstance() {
        return KeycloakBuilder.builder()
            .serverUrl(authServerUrl)
            .realm(realm)
            .grantType(OAuth2Constants.PASSWORD)
            .clientId(clientId)
            .username(username)
            .password(password)
            .build();
    }

    public UserRepresentation getUser(String userId) {
        Keycloak keycloak = getKeycloakInstance();
        try {
            return keycloak.realm(realm).users().get(userId).toRepresentation();
        } catch (NotFoundException e) {
            System.out.println("User not found in Keycloak: " + userId);
            System.out.println(e.getMessage());
            return null;
        } catch (Exception e) {
            System.out.println("Error retrieving user from Keycloak: " + userId);
            System.out.println(e.getMessage());
            return null;
        }
    }
}
