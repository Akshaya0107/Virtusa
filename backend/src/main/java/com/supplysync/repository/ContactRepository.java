package com.supplysync.repository;

import com.supplysync.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
}
