package com.sanjayverma.portfolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private String technologies;
    private String githubLink;
    private String liveDemoLink;
    
    // Constructors
    public Project() {}
    
    public Project(String title, String description, String technologies, String githubLink, String liveDemoLink) {
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.githubLink = githubLink;
        this.liveDemoLink = liveDemoLink;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    
    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }
    
    public String getLiveDemoLink() { return liveDemoLink; }
    public void setLiveDemoLink(String liveDemoLink) { this.liveDemoLink = liveDemoLink; }
}