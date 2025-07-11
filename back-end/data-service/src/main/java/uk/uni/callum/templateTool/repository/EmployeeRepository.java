package uk.uni.callum.templateTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import uk.uni.callum.templateTool.model.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Employee findByKeycloakId(@Param("keycloakId") String keycloakId);

    Optional<Employee> findByEmail(String email);
}
