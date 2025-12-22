package com.sanjayverma.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sanjayverma.portfolio.model.Visitor;
import com.sanjayverma.portfolio.repository.VisitorRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    @Autowired
    private VisitorRepository visitorRepository;

    @PostMapping
    public ResponseEntity<?> registerVisitor(@RequestBody Visitor visitor) {

        visitorRepository.save(visitor);

        return ResponseEntity.ok(
                Map.of("message", "visitor saved successfully")
        );
    }
}
