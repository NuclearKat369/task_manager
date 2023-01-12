package com.nuclear_kat.task_manager.auth.token.refresh;

import com.nuclear_kat.task_manager.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RefreshTokenResponse {
    private String accessToken;
    private String refreshToken;
    private String email;
    private Collection<Role> roles;

    private HttpStatus status;
}
