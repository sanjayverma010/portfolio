package com.sanjayverma.portfolio.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    /* ===================== PUBLIC SETUP (ONE-TIME USE) ===================== */
    @PostMapping("/setup")
    public String setupAdmin() {

        // Check if admin already exists
        if (adminRepository.findByUsername("admin").isPresent()) {
            return "Admin already exists! Use /api/admin/reset-password to change password.";
        }

        // Create admin in ADMINS table (this is what CustomUserDetailsService uses)
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");

        adminRepository.save(admin);

        return "Admin created successfully! Username: admin, Password: admin123";
    }

    /* ===================== ADMIN ONLY ===================== */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/reset-password")
    public String resetAdminPassword(@RequestBody(required = false) Map<String, String> body) {

        String newPassword = (body != null && body.get("password") != null)
                ? body.get("password")
                : "admin123";

        Optional<User> userOpt = userRepository.findByUsername("admin");
        Optional<Admin> adminOpt = adminRepository.findByUsername("admin");

        if (userOpt.isEmpty() && adminOpt.isEmpty()) {
            return "Admin not found";
        }

        userOpt.ifPresent(user -> {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        });

        adminOpt.ifPresent(admin -> {
            admin.setPassword(passwordEncoder.encode(newPassword));
            adminRepository.save(admin);
        });

        return "Admin password reset successfully";
    }
}
