package com.sanjayverma.portfolio.util;

import com.sanjayverma.portfolio.model.Admin;
import com.sanjayverma.portfolio.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminRepository adminRepository;

    public Map<String, Object> login(String username, String password) {
        Map<String, Object> response = new HashMap<>();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // FIXED TOKEN GENERATION
            String token = jwtUtil.generateToken(userDetails.getUsername());

            Optional<Admin> adminOpt = adminRepository.findByUsername(username);

            response.put("token", token);
            response.put("username", userDetails.getUsername());
            response.put("role", adminOpt.map(Admin::getRole).orElse("ADMIN"));
            response.put("message", "Login successful!");

        } catch (Exception e) {
            response.put("error", "Invalid username or password");
        }

        return response;
    }
}
