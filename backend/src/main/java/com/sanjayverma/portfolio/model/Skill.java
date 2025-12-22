package com.sanjayverma.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;          // e.g., React, Java
    private String category;      // e.g., Frontend, Backend
    private String level;         // FIX ✔ (your controller uses this)
    private String description;   // FIX ✔
    private String icon;          // emoji/icon string

    public Skill() {}

    public Skill(String name, String category, String level, String description, String icon) {
        this.name = name;
        this.category = category;
        this.level = level;
        this.description = description;
        this.icon = icon;
    }

    // -------------------------------
    // GETTERS & SETTERS
    // -------------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLevel() {   // FIX ✔
        return level;
    }

    public void setLevel(String level) {  // FIX ✔
        this.level = level;
    }

    public String getDescription() {   // FIX ✔
        return description;
    }

    public void setDescription(String description) {  // FIX ✔
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
