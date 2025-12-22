package com.sanjayverma.portfolio.controller;

import com.sanjayverma.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public Map<String, String> healthCheck() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("database", "MySQL");
        status.put("timestamp", java.time.LocalDateTime.now().toString());
        return status;
    }
}