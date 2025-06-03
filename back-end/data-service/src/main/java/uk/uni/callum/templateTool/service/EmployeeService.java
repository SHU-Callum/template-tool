package uk.uni.callum.templateTool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.uni.callum.templateTool.model.Employee;
import uk.uni.callum.templateTool.repository.EmployeeRepository;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Find employee by email.
     *
     * @param email The email of the employee to find.
     * @return An Optional containing the Employee if found, or empty if not found.
     */
    public Optional<Employee> findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}