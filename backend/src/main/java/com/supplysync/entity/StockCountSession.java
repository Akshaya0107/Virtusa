package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stock_count_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockCountSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionTitle;
    
    @Enumerated(EnumType.STRING)
    private SessionStatus status; // IN_PROGRESS, COMPLETED

    @CreationTimestamp
    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<StockCountItem> items = new ArrayList<>();

    public enum SessionStatus {
        IN_PROGRESS, COMPLETED
    }
}
