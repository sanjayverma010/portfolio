package com.sanjayverma.portfolio.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendLoginAlert(String email) {
        // Here you would send an email notification
        System.out.println("Login alert sent to: " + email);
    }
}
