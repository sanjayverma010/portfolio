package com.sanjayverma.portfolio.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long expirationMs;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration:86400000}") long expirationMs) {

        // Ensure secret key length is safe for HS256
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMs = expirationMs;
    }

    // ------------------------------------------------
    // Generate token
    // ------------------------------------------------
    public String generateToken(String username) {

        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Overload for UserDetails
    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername());
    }

    // ------------------------------------------------
    // Extract username
    // ------------------------------------------------
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ------------------------------------------------
    // Validate token with UserDetails
    // ------------------------------------------------
    public boolean validateToken(String token, UserDetails userDetails) {

        String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // ------------------------------------------------
    // Validate token only
    // ------------------------------------------------
    public boolean validateToken(String token) {

        try {
            extractAllClaims(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    // ------------------------------------------------
    // Check expiration
    // ------------------------------------------------
    private boolean isTokenExpired(String token) {

        Date expiration = extractAllClaims(token).getExpiration();

        return expiration.before(new Date());
    }

    // ------------------------------------------------
    // Extract claims safely
    // ------------------------------------------------
    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}