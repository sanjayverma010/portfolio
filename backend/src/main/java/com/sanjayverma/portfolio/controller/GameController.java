package com.sanjayverma.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sanjayverma.portfolio.model.Game;
import com.sanjayverma.portfolio.repository.GameRepository;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    // ===========================
    // 🌍 GET ALL GAMES (PUBLIC)
    // ===========================
    @GetMapping
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(gameRepository.findAll());
    }

    // ===========================
    // 🌍 GET GAME BY ID (PUBLIC)
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        return gameRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // 🔐 CREATE NEW GAME (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        Game saved = gameRepository.save(game);
        return ResponseEntity.ok(saved);
    }

    // ===========================
    // 🔐 UPDATE GAME (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(
            @PathVariable Long id,
            @RequestBody Game updated) {

        Optional<Game> existing = gameRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Game game = existing.get();
        game.setTitle(updated.getTitle());
        game.setShortDescription(updated.getShortDescription());
        game.setDescription(updated.getDescription());
        game.setTechnologies(updated.getTechnologies());
        game.setImageUrl(updated.getImageUrl());
        game.setEmbedUrl(updated.getEmbedUrl());
        game.setExternalUrl(updated.getExternalUrl());
        game.setGithubUrl(updated.getGithubUrl());

        return ResponseEntity.ok(gameRepository.save(game));
    }

    // ===========================
    // 🔐 DELETE GAME (ADMIN ONLY)
    // ===========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (!gameRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        gameRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
