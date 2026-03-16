package com.sanjayverma.portfolio.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    /* ===================== DEV ONLY ===================== */
    @Profile("dev")
    @PostMapping("/setup")
    public String setupAdmin() {

        if (userRepository.findByUsername("admin").isPresent()) {
            return "Admin already exists";
        }

        // -------- USER TABLE --------
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setEmail("sanjayverma010@gmail.com");
        adminUser.setPassword(passwordEncoder.encode("admin123"));
        adminUser.setEnabled(true);
        adminUser.setRole("ROLE_ADMIN"); // 🔴 IMPORTANT

        userRepository.save(adminUser);

        // -------- ADMIN TABLE --------
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");

        adminRepository.save(admin);

        return "Admin created successfully (admin / admin123)";
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
