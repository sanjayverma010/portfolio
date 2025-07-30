package com.sanjayverma.portfolio.controller;  // Must match directory structure

import com.sanjayverma.portfolio.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    
    private final EmailService emailService;

    @Autowired  // Constructor injection is preferred over field injection
    public TestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/send-email")
    public String testEmail() {
        emailService.sendLoginAlert("your-email@example.com"); // Replace with your email
        return "Email sent successfully! Check your inbox.";
    }
}