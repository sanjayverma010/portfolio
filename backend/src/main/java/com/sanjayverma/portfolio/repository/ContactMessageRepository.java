package com.sanjayverma.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sanjayverma.portfolio.model.ContactMessage;

public interface ContactMessageRepository 
        extends JpaRepository<ContactMessage, Long> {
}
