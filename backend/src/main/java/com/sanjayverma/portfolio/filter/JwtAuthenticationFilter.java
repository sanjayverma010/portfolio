package com.sanjayverma.portfolio.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sanjayverma.portfolio.service.CustomUserDetailsService;
import com.sanjayverma.portfolio.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // ---------------------------------------------
        // ✅ 1. SKIP JWT FOR PUBLIC API ROUTES
        // ---------------------------------------------
        if (path.startsWith("/api/skills") ||
            path.startsWith("/api/projects") ||
            path.startsWith("/api/games") ||
            path.startsWith("/api/achievements") ||
            path.startsWith("/api/contact") ||
            path.startsWith("/api/visitors") ||
            path.startsWith("/api/trainings") ||
            path.startsWith("/api/auth/login") ||
            path.startsWith("/api/auth/validate")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        // ---------------------------------------------
        // ✅ 2. PROCESS JWT FOR PROTECTED ROUTES
        // ---------------------------------------------
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        // Extract JWT token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwtToken);
            } catch (Exception e) {
                System.out.println("JWT parsing error: " + e.getMessage());
            }
        }

        // Validate and set authentication
        if (username != null &&
            SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwtToken, userDetails)) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
