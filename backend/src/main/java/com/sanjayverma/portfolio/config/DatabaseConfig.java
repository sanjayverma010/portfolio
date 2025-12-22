package com.sanjayverma.portfolio.config;

import com.sanjayverma.portfolio.repository.AdminRepository;
import com.sanjayverma.portfolio.model.Admin;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfig {

    private final AdminRepository adminRepository;

    public DatabaseConfig(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostConstruct
    public void checkAdmin() {
        System.out.println("🔍 Checking admin user in ADMINS table...");

        Admin admin = adminRepository.findByUsername("admin").orElse(null);

        if (admin == null) {
            System.out.println("⚠️ Admin NOT FOUND! Insert manually via MySQL.");
        } else {
            System.out.println("✅ Admin found: " + admin.getUsername());
        }
    }
}
