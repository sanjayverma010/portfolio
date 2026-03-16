package com.sanjayverma.portfolio.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @Column(length = 2000)
    private String message;
}
