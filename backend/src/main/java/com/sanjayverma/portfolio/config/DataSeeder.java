package com.sanjayverma.portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sanjayverma.portfolio.model.Achievement;
import com.sanjayverma.portfolio.model.Certification;
import com.sanjayverma.portfolio.model.Project;
import com.sanjayverma.portfolio.model.Skill;
import com.sanjayverma.portfolio.model.Training;
import com.sanjayverma.portfolio.repository.AchievementRepository;
import com.sanjayverma.portfolio.repository.CertificationRepository;
import com.sanjayverma.portfolio.repository.ProjectRepository;
import com.sanjayverma.portfolio.repository.SkillRepository;
import com.sanjayverma.portfolio.repository.TrainingRepository;
import com.sanjayverma.portfolio.repository.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public void run(String... args) throws Exception {

        // User creation commented out to avoid duplicate errors
        // // Create your personal normal user
        // if (userRepository.findByUsername("Sanjay").isEmpty()) {
        // User sanjay = new User();
        // sanjay.setUsername("Sanjay");
        // sanjay.setEmail("rssanjayverma010@gmail.com");
        // sanjay.setPassword(passwordEncoder.encode("sanjay@2004"));
        // sanjay.setRole("USER");
        // sanjay.setEnabled(true);
        // userRepository.save(sanjay);
        // System.out.println("Sanjay user created!");
        // }

        // Seed Projects
        if (projectRepository.count() == 0) {
            Project project1 = new Project();
            project1.setTitle("Portfolio Website");
            project1.setDescription("A full-stack portfolio application built with Spring Boot and React");
            project1.setTechnologies("Java, Spring Boot, React, MySQL");
            project1.setGithubLink("https://github.com/sanjayverma/portfolio");
            project1.setLiveDemoLink("https://sanjayverma.dev");
            projectRepository.save(project1);

            Project project2 = new Project();
            project2.setTitle("E-commerce Platform");
            project2.setDescription("A scalable e-commerce solution with payment integration");
            project2.setTechnologies("Java, Spring, Angular, PostgreSQL");
            project2.setGithubLink("https://github.com/sanjayverma/ecommerce");
            project2.setLiveDemoLink("https://shop.example.com");
            projectRepository.save(project2);

            System.out.println("Sample projects created!");
        }

        // Seed Achievements
        if (achievementRepository.count() == 0) {
            Achievement achievement1 = new Achievement();
            achievement1.setTitle("AWS Certified Developer");
            achievement1.setDescription("Amazon Web Services Developer Associate certification");
            achievement1.setDate("2023-06-15");
            achievement1.setCategory("Certification");
            achievementRepository.save(achievement1);

            Achievement achievement2 = new Achievement();
            achievement2.setTitle("Java OCP");
            achievement2.setDescription("Oracle Certified Java Programmer");
            achievement2.setDate("2022-12-01");
            achievement2.setCategory("Certification");
            achievementRepository.save(achievement2);

            System.out.println("Sample achievements created!");
        }

        // Seed Trainings
        if (trainingRepository.count() == 0) {
            Training training1 = new Training();
            training1.setTitle("Full Stack Development Bootcamp");
            training1.setInstitution("Udemy");
            training1.setDescription("Comprehensive training in modern web development");
            training1.setDuration("3 months");
            trainingRepository.save(training1);

            Training training2 = new Training();
            training2.setTitle("Spring Framework Mastery");
            training2.setInstitution("Coursera");
            training2.setDescription("Advanced Spring Boot and microservices");
            training2.setDuration("3 months");
            trainingRepository.save(training2);

            System.out.println("Sample trainings created!");
        }

        // Seed Certifications
        if (certificationRepository.count() == 0) {
            Certification certification1 = new Certification();
            certification1.setTitle("AWS Solutions Architect");
            certification1.setOrganization("Amazon Web Services");
            certification1.setYear("2023");
            certification1.setCertificateLink("https://example.com/aws-architect.pdf");
            certificationRepository.save(certification1);

            Certification certification2 = new Certification();
            certification2.setTitle("Google Cloud Professional");
            certification2.setOrganization("Google Cloud");
            certification2.setYear("2022");
            certification2.setCertificateLink("https://example.com/gcp-cert.pdf");
            certificationRepository.save(certification2);

            System.out.println("Sample certifications created!");
        }

        // Seed Skills
        if (skillRepository.count() == 0) {
            Skill skill1 = new Skill();
            skill1.setName("Java");
            skill1.setCategory("Programming Languages");
            skill1.setLevel("Expert");
            skill1.setDescription("Object-oriented programming language");
            skill1.setIcon("☕");
            skillRepository.save(skill1);

            Skill skill2 = new Skill();
            skill2.setName("Spring Boot");
            skill2.setCategory("Frameworks");
            skill2.setLevel("Expert");
            skill2.setDescription("Java framework for building web applications");
            skill2.setIcon("🌱");
            skillRepository.save(skill2);

            Skill skill3 = new Skill();
            skill3.setName("React");
            skill3.setCategory("Frontend");
            skill3.setLevel("Advanced");
            skill3.setDescription("JavaScript library for building user interfaces");
            skill3.setIcon("⚛️");
            skillRepository.save(skill3);

            Skill skill4 = new Skill();
            skill4.setName("MySQL");
            skill4.setCategory("Databases");
            skill4.setLevel("Intermediate");
            skill4.setDescription("Relational database management system");
            skill4.setIcon("🗄️");
            skillRepository.save(skill4);

            Skill skill5 = new Skill();
            skill5.setName("AWS");
            skill5.setCategory("Cloud");
            skill5.setLevel("Beginner");
            skill5.setDescription("Amazon Web Services cloud platform");
            skill5.setIcon("☁️");
            skillRepository.save(skill5);

            System.out.println("Sample skills created!");
        }

        System.out.println("Data seeding completed!");
    }
}
