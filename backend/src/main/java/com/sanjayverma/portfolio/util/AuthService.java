package com.sanjayverma.portfolio.util;

import com.sanjayverma.portfolio.model.Admin;
import com.sanjayverma.portfolio.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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

            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Generate JWT Token
            String token = jwtUtil.generateToken(userDetails.getUsername());

            // Fetch admin info
            Optional<Admin> adminOpt = adminRepository.findByUsername(username);

            String role = adminOpt.map(Admin::getRole).orElse("ADMIN");

            response.put("token", token);
            response.put("username", userDetails.getUsername());
            response.put("role", role);
            response.put("message", "Login successful");

        } catch (BadCredentialsException e) {

            response.put("error", "Invalid username or password");

        }

        return response;
    }
}