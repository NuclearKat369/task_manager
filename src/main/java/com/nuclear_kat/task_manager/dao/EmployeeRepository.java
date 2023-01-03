package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    Optional <Employee> findEmployeeByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Employee e " +
            "SET e.enabled = TRUE WHERE e.email = ?1")
    int enableEmployee(String email);
}
