package com.nuclear_kat.task_manager.auth.token.refresh;

import com.nuclear_kat.task_manager.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository <RefreshToken, Long>  {
    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByEmployee(Employee employee);

    @Modifying
    int deleteByEmployee(Employee employee);

    @Modifying
    int deleteByToken(String string);
}
