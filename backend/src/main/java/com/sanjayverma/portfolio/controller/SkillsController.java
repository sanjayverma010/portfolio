package com.sanjayverma.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sanjayverma.portfolio.model.Skill;
import com.sanjayverma.portfolio.repository.SkillRepository;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {

    @Autowired
    private SkillRepository skillRepository;

    // ===========================
    // 🌍 GET ALL SKILLS (PUBLIC)
    // ===========================
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillRepository.findAll());
    }

    // ===========================
    // 🌍 GET SKILL BY ID (PUBLIC)
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        return skillRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // 🔐 ADD NEW SKILL (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        Skill saved = skillRepository.save(skill);
        return ResponseEntity.ok(saved);
    }

    // ===========================
    // 🔐 UPDATE SKILL (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill updatedSkill) {

        Optional<Skill> existing = skillRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Skill skill = existing.get();
        skill.setName(updatedSkill.getName());
        skill.setCategory(updatedSkill.getCategory());
        skill.setLevel(updatedSkill.getLevel());
        skill.setIcon(updatedSkill.getIcon());
        skill.setDescription(updatedSkill.getDescription());

        return ResponseEntity.ok(skillRepository.save(skill));
    }

    // ===========================
    // 🔐 DELETE SKILL (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        if (!skillRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        skillRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
