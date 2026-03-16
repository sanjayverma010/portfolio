package com.sanjayverma.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sanjayverma.portfolio.model.Project;
import com.sanjayverma.portfolio.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // ===========================
    // 🌍 GET ALL PROJECTS (PUBLIC)
    // ===========================
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }

    // ===========================
    // 🌍 GET PROJECT BY ID (PUBLIC)
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // 🔐 ADD PROJECT (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody Project project) {
        Project saved = projectRepository.save(project);
        return ResponseEntity.ok(saved);
    }

    // ===========================
    // 🔐 UPDATE PROJECT (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody Project updatedProject
    ) {
        return projectRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updatedProject.getTitle());
                    existing.setDescription(updatedProject.getDescription());
                    existing.setGithubLink(updatedProject.getGithubLink());
                    existing.setLiveDemoLink(updatedProject.getLiveDemoLink());
                    existing.setTechnologies(updatedProject.getTechnologies());

                    Project saved = projectRepository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // 🔐 DELETE PROJECT (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
