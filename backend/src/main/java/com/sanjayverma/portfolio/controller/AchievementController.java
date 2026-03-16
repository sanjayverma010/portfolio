package com.sanjayverma.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sanjayverma.portfolio.model.Achievement;
import com.sanjayverma.portfolio.repository.AchievementRepository;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    @Autowired
    private AchievementRepository achievementRepository;

    // ===========================
    // 🌍 GET ALL ACHIEVEMENTS (PUBLIC)
    // ===========================
    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        return ResponseEntity.ok(achievementRepository.findAll());
    }

    // ===========================
    // 🌍 GET ACHIEVEMENT BY ID (PUBLIC)
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable Long id) {
        return achievementRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // 🔐 CREATE ACHIEVEMENT (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        Achievement saved = achievementRepository.save(achievement);
        return ResponseEntity.ok(saved);
    }

    // ===========================
    // 🔐 UPDATE ACHIEVEMENT (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement updated) {

        Optional<Achievement> existing = achievementRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Achievement ach = existing.get();
        ach.setTitle(updated.getTitle());
        ach.setDescription(updated.getDescription());
        ach.setDate(updated.getDate());
        ach.setCategory(updated.getCategory());

        return ResponseEntity.ok(achievementRepository.save(ach));
    }

    // ===========================
    // 🔐 DELETE ACHIEVEMENT (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        if (!achievementRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        achievementRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
