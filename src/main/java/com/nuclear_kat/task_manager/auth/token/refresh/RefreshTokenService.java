package com.nuclear_kat.task_manager.auth.token.refresh;

import com.nuclear_kat.task_manager.entity.Employee;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface RefreshTokenService {

    Optional<RefreshToken> findByToken(String token);

    RefreshTokenResponse refreshToken(RefreshTokenRequest request);

    boolean isRefreshTokenValid(RefreshToken refreshToken);

    int deleteByEmployee(HttpServletRequest request);

    void deleteByEmployee(Employee employee);
}
