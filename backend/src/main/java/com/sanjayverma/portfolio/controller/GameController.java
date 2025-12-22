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

import com.sanjayverma.portfolio.model.Game;
import com.sanjayverma.portfolio.repository.GameRepository;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    // GET ALL GAMES
    @GetMapping
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(gameRepository.findAll());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Optional<Game> game = gameRepository.findById(id);
        return game.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE NEW GAME
    @PostMapping
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        Game saved = gameRepository.save(game);
        return ResponseEntity.ok(saved);
    }

    // UPDATE GAME
    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game updated) {
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

    // DELETE GAME
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (!gameRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        gameRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
