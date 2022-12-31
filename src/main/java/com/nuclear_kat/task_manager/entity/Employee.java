package com.nuclear_kat.task_manager.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "employee", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private UUID uuid;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "patronymic")
    private String patronymic;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "employee_role",
            joinColumns = @JoinColumn(
                    name = "employee_employee_id", referencedColumnName = "employee_id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_role_id", referencedColumnName = "role_id"))
    private Collection<Role> roles;

    public Employee(String lastName, String firstName, String patronymic
            , String email, String password, Collection<Role> roles) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
