package com.sanjayverma.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjayverma.portfolio.model.Message;
import com.sanjayverma.portfolio.repository.MessageRepository;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final MessageRepository messageRepository;

    public ContactController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // ✔ Save contact message
    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactRequest req) {

        // Save message
        Message msg = new Message(
                req.getName(),
                req.getEmail(),
                req.getMessage());

        messageRepository.save(msg);

        return ResponseEntity.ok(new ContactResponse("Message sent successfully!"));
    }

    // ✔ Admin: fetch all messages
    @GetMapping("/all")
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageRepository.findAllByOrderByCreatedAtDesc());
    }

    // DTO Classes
    public static class ContactRequest {
        private String name;
        private String email;
        private String message;

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class ContactResponse {
        private String message;

        public ContactResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
