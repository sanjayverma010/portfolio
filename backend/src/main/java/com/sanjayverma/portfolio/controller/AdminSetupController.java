package com.sanjayverma.portfolio.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjayverma.portfolio.model.Admin;
import com.sanjayverma.portfolio.model.User;
import com.sanjayverma.portfolio.repository.AdminRepository;
import com.sanjayverma.portfolio.repository.UserRepository;


@RestController
@RequestMapping("/api/admin")
public class AdminSetupController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/setup")
    public String setupAdmin() {
        Optional<User> existingAdmin = userRepository.findByUsername("admin");
        
        if (existingAdmin.isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("sanjayverma010@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEnabled(true);
            
            userRepository.save(admin);
            // also create an Admin record for admin login if Admin table is empty
            Optional<Admin> existingAdminRecord = adminRepository.findByUsername("admin");
            if (existingAdminRecord.isEmpty()) {
                Admin adminRecord = new Admin();
                adminRecord.setUsername("admin");
                adminRecord.setPassword(passwordEncoder.encode("admin123"));
                adminRecord.setRole("ADMIN");
                adminRepository.save(adminRecord);
            }
            return "Admin user created successfully!\nUsername: admin\nPassword: admin123";
        } else {
            return "Admin user already exists";
        }
    }

    // ⚠️ Development helper: reset the admin password to a known value.
    // Accepts optional 'password' field in request body; if absent, defaults to 'admin123'.
    @PostMapping("/reset")
    public String resetAdminPassword(@RequestBody(required = false) Map<String, String> body) {
        Optional<User> existingAdmin = userRepository.findByUsername("admin");
        Optional<Admin> existingAdminRecord = adminRepository.findByUsername("admin");

        if (existingAdmin.isEmpty() && existingAdminRecord.isEmpty()) {
            return "No admin user found to reset";
        }

        String newPassword = (body != null && body.get("password") != null) ? body.get("password") : "admin123";

        if (existingAdmin.isPresent()) {
            User admin = existingAdmin.get();
            admin.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(admin);
        }

        if (existingAdminRecord.isPresent()) {
            Admin adminRec = existingAdminRecord.get();
            adminRec.setPassword(passwordEncoder.encode(newPassword));
            adminRepository.save(adminRec);
        }

        return "Admin password reset successfully. New password: " + newPassword;
    }
}