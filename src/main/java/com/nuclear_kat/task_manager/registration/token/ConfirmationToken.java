package com.nuclear_kat.task_manager.registration.token;

import com.nuclear_kat.task_manager.entity.Employee;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "confirmation_token")
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;

    @Column(name = "token_data")
    private String token;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "expires_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "confirmed_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime confirmedAt;

    @ManyToOne
    @JoinColumn(name = "employee", nullable = false)
    private Employee employee;

    public ConfirmationToken(String token, LocalDateTime createdAt
            , LocalDateTime expiresAt, Employee employee) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.employee = employee;
    }
}
