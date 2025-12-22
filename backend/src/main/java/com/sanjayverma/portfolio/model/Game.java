package com.sanjayverma.portfolio.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String shortDescription;
    
    @Column(length = 2000) // For longer descriptions
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "game_technologies", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "technology")
    private List<String> technologies;
    
    private String imageUrl;
    private String embedUrl; // for iframe embedding
    private String externalUrl; // for external games
    private String githubUrl; // source code link
    
    // Constructors
    public Game() {}
    
    public Game(String title, String shortDescription, String description, List<String> technologies, 
                String imageUrl, String embedUrl, String externalUrl, String githubUrl) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.description = description;
        this.technologies = technologies;
        this.imageUrl = imageUrl;
        this.embedUrl = embedUrl;
        this.externalUrl = externalUrl;
        this.githubUrl = githubUrl;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEmbedUrl() {
        return embedUrl;
    }

    public void setEmbedUrl(String embedUrl) {
        this.embedUrl = embedUrl;
    }

    public String getExternalUrl() {
        return externalUrl;
    }

    public void setExternalUrl(String externalUrl) {
        this.externalUrl = externalUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
}