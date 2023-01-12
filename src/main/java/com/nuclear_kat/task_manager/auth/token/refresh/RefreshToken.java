package com.nuclear_kat.task_manager.auth.token.refresh;

import com.nuclear_kat.task_manager.entity.Employee;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "refresh_token")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;
    @Column(name = "token_data")
    private String token;
    @Column(name = "expires_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", nullable = false)
    private LocalDateTime expiresAt;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee", referencedColumnName ="employee_id", nullable = false)
    private Employee employee;

    public RefreshToken(String token, LocalDateTime expiresAt, Employee employee) {
        this.token = token;
        this.expiresAt = expiresAt;
        this.employee = employee;
    }
}
