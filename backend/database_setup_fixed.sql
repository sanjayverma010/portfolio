-- ===============================
-- Portfolio Database Setup Script
-- ===============================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- ===============================
-- Users Table (for authentication)
-- ===============================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT IGNORE INTO users (username, password, email, role) VALUES
('admin', '$2a$10$examplehashedpassword', 'admin@portfolio.com', 'ADMIN');

-- ===============================
-- Projects Table
-- ===============================
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies VARCHAR(500),
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample projects
INSERT IGNORE INTO projects (title, description, technologies, github_url, live_url, image_url) VALUES
('Portfolio Website', 'A full-stack portfolio application built with Spring Boot and React', 'Java, Spring Boot, React, MySQL', 'https://github.com/sanjayverma/portfolio', 'https://sanjayverma.dev', 'https://example.com/portfolio.jpg'),
('E-commerce Platform', 'A scalable e-commerce solution with payment integration', 'Java, Spring, Angular, PostgreSQL', 'https://github.com/sanjayverma/ecommerce', 'https://shop.example.com', 'https://example.com/ecommerce.jpg');

-- ===============================
-- Achievements Table
-- ===============================
CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_achieved DATE,
    issuer VARCHAR(255),
    certificate_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample achievements
INSERT IGNORE INTO achievements (title, description, date_achieved, issuer, certificate_url) VALUES
('AWS Certified Developer', 'Amazon Web Services Developer Associate certification', '2023-06-15', 'Amazon Web Services', 'https://example.com/aws-cert.pdf'),
('Java OCP', 'Oracle Certified Java Programmer', '2022-12-01', 'Oracle', 'https://example.com/java-cert.pdf');

-- ===============================
-- Trainings Table
-- ===============================
CREATE TABLE IF NOT EXISTS trainings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    certificate_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample trainings
INSERT IGNORE INTO trainings (title, institution, description, start_date, end_date, certificate_url) VALUES
('Full Stack Development Bootcamp', 'Udemy', 'Comprehensive training in modern web development', '2023-01-01', '2023-03-31', 'https://example.com/bootcamp-cert.pdf'),
('Spring Framework Mastery', 'Coursera', 'Advanced Spring Boot and microservices', '2022-09-01', '2022-11-30', 'https://example.com/spring-cert.pdf');

-- ===============================
-- Certifications Table
-- ===============================
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(100),
    credential_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample certifications
INSERT IGNORE INTO certifications (title, issuer, issue_date, expiry_date, credential_id, credential_url) VALUES
('AWS Solutions Architect', 'Amazon Web Services', '2023-05-10', '2026-05-10', 'AWS-SAA-12345', 'https://example.com/aws-architect.pdf'),
('Google Cloud Professional', 'Google Cloud', '2022-08-20', '2025-08-20', 'GCP-PRO-67890', 'https://example.com/gcp-cert.pdf');

-- ===============================
-- Skills Table
-- ===============================
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    proficiency_level INT CHECK (proficiency_level BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample skills
INSERT IGNORE INTO skills (name, category, proficiency_level) VALUES
('Java', 'Programming Languages', 5),
('Spring Boot', 'Frameworks', 5),
('React', 'Frontend', 4),
('MySQL', 'Databases', 4),
('AWS', 'Cloud', 3);

-- ===============================
-- Visitor Messages Table
-- ===============================
CREATE TABLE IF NOT EXISTS visitor_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample message
INSERT IGNORE INTO visitor_messages (name, email, subject, message, is_read) VALUES
('John Doe', 'john@example.com', 'Portfolio Inquiry', 'Great portfolio! Interested in collaboration.', TRUE);

-- ===============================
-- Games Table (if needed)
-- ===============================
CREATE TABLE IF NOT EXISTS games (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    technologies VARCHAR(500),
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample game
INSERT IGNORE INTO games (name, description, technologies, github_url, live_url, image_url) VALUES
('Snake Game', 'Classic snake game built with JavaScript', 'JavaScript, HTML5, CSS', 'https://github.com/sanjayverma/snake', 'https://sanjayverma.dev/snake', 'https://example.com/snake.jpg');