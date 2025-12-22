package com.sanjayverma.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjayverma.portfolio.model.Message;
import com.sanjayverma.portfolio.repository.MessageRepository;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository repo;

    public MessageController(MessageRepository repo) {
        this.repo = repo;
    }

    // Save message from contact form
    @PostMapping
    public Message saveMessage(@RequestBody Message msg) {
        return repo.save(msg);
    }

    // Fetch all messages (admin)
    @GetMapping
    public List<Message> getAllMessages() {
        return repo.findAllByOrderByCreatedAtDesc();
    }
}
