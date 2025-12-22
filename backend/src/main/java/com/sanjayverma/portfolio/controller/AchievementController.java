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

import com.sanjayverma.portfolio.model.Achievement;
import com.sanjayverma.portfolio.repository.AchievementRepository;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    @Autowired
    private AchievementRepository achievementRepository;

    // GET ALL ACHIEVEMENTS
    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        return ResponseEntity.ok(achievementRepository.findAll());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable Long id) {
        Optional<Achievement> achievement = achievementRepository.findById(id);
        return achievement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE NEW ACHIEVEMENT
    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        Achievement saved = achievementRepository.save(achievement);
        return ResponseEntity.ok(saved);
    }

    // UPDATE ACHIEVEMENT
    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable Long id, @RequestBody Achievement updated) {
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

    // DELETE ACHIEVEMENT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        if (!achievementRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        achievementRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
