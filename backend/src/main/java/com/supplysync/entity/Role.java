package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, unique = true)
    private RoleType name;

    public enum RoleType {
        ROLE_STORE_MANAGER,
        ROLE_WAREHOUSE,
        ROLE_SUPPLIER,
        ROLE_FINANCE_ADMIN
    }
}
