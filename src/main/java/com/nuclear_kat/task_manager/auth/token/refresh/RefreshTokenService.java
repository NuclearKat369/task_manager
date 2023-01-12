package com.nuclear_kat.task_manager.auth.token.refresh;

import com.nuclear_kat.task_manager.config.JwtService;
import com.nuclear_kat.task_manager.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private JwtService jwtService;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {
        RefreshTokenResponse response = new RefreshTokenResponse();
        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByToken(request.getRefreshToken());

        if (optionalRefreshToken.isPresent()) {
            System.out.println("optional.isPresent()");
            if (isRefreshTokenValid(optionalRefreshToken.get())) {
                System.out.println("isRefreshTokenValid(optional.get())");
                RefreshToken refreshToken = optionalRefreshToken.get();
                response.setRefreshToken(request.getRefreshToken());
                response.setAccessToken(jwtService.generateToken(refreshToken.getEmployee()));
                response.setEmail(refreshToken.getEmployee().getEmail());
                response.setRoles(refreshToken.getEmployee().getRoles());
                response.setStatus(HttpStatus.OK);
            } else response.setStatus(HttpStatus.FORBIDDEN);
        } else response.setStatus(HttpStatus.UNAUTHORIZED);
        System.out.println(response);
        return response;
    }

    public boolean isRefreshTokenValid(RefreshToken refreshToken) {
        System.out.println("in verifyExpiration" + (refreshToken.getExpiresAt().toInstant(ZoneOffset.UTC).compareTo(Instant.now()) < 0));
        if (refreshToken.getExpiresAt().toInstant(ZoneOffset.UTC).compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refreshToken);
            return false;
        }
        return true;
    }

    @Transactional
    public int deleteRefreshToken(RefreshTokenRequest request) {
        Optional<RefreshToken> optional = refreshTokenRepository.findByToken(request.getRefreshToken());
        if (optional.isPresent()) {
            return refreshTokenRepository.deleteByToken(request.getRefreshToken());
        } else return 0;
    }

    @Transactional
    public void deleteByEmployee(Employee employee) {
        refreshTokenRepository.deleteByEmployee(employee);
    }
}
