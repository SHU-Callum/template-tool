package uk.uni.callum.templateTool.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig { // Configuration to enable Swagger UI

    public static final String SCHEME_NAME = "BearerScheme";
    public static final String SCHEME = "Bearer";

    @Bean
    public OpenAPI openAPIConfig() {
        var openApi = new OpenAPI().info(this.openApiInfo());
        this.addSecurity(openApi); // Adds input for security token
        return openApi;
    }

    @Bean
    public Info openApiInfo() {
        return new Info()
            .title("Template Tool APIs")
            .version("1.0")
            .description("API documentation for Template Tool application");
    }

    private SecurityScheme createSecurityScheme() {
        return new SecurityScheme().name(SCHEME_NAME).type(SecurityScheme.Type.HTTP).scheme(SCHEME);
    }

    private Components createComponents() {
        var components = new Components();
        components.addSecuritySchemes(SCHEME_NAME, this.createSecurityScheme());
        return components;
    }

    private void addSecurity(OpenAPI openApi) {
        var components = this.createComponents();
        var securityItem = new SecurityRequirement().addList(SCHEME_NAME);
        openApi.components(components).addSecurityItem(securityItem);
    }
}