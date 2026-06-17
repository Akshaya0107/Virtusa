package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String keyName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String value;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Settings(String keyName, String value) {
        this.keyName = keyName;
        this.value = value;
    }
}
