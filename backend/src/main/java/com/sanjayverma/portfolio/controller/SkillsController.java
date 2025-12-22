package com.sanjayverma.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjayverma.portfolio.model.Skill;
import com.sanjayverma.portfolio.repository.SkillRepository;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {

    @Autowired
    private SkillRepository skillRepository;

    // ===========================
    // GET ALL SKILLS
    // ===========================
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillRepository.findAll());
    }

    // ===========================
    // GET SKILL BY ID
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        Optional<Skill> skill = skillRepository.findById(id);
        return skill.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // ADD NEW SKILL
    // ===========================
    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        Skill saved = skillRepository.save(skill);
        return ResponseEntity.ok(saved);
    }

    // ===========================
    // UPDATE SKILL
    // ===========================
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
    // DELETE SKILL
    // ===========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        if (!skillRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        skillRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
