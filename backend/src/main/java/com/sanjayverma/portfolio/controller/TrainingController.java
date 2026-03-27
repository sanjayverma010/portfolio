package com.sanjayverma.portfolio.controller;

import com.sanjayverma.portfolio.model.Training;
import com.sanjayverma.portfolio.repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/trainings", "/trainings"})
@CrossOrigin("*")
public class TrainingController {

    @Autowired
    private TrainingRepository trainingRepository;

    @GetMapping
    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }
}