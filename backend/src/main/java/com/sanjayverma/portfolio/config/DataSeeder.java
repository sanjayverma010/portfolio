package com.sanjayverma.portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.sanjayverma.portfolio.model.User;
import com.sanjayverma.portfolio.repository.UserRepository;

// @Component  // DISABLED: This was seeding wrong users table
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // ❌ REMOVE ADMIN CREATION — ADMIN BELONGS TO ADMINS TABLE ONLY

        // Create your personal normal user
        if (userRepository.findByUsername("Sanjay").isEmpty()) {
            User sanjay = new User();
            sanjay.setUsername("Sanjay");
            sanjay.setEmail("rssanjayverma010@gmail.com");
            sanjay.setPassword(passwordEncoder.encode("sanjay@2004"));
            sanjay.setEnabled(true);
            userRepository.save(sanjay);
            System.out.println("Sanjay user created!");
        }
    }
}
