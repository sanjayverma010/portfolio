package com.sanjayverma.portfolio.controller;

import com.sanjayverma.portfolio.repository.ProjectRepository;
import com.sanjayverma.portfolio.repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TrainingRepository trainingRepository;

    @GetMapping("/home")
    public Map<String, Object> getHomeData() {
        Map<String, Object> data = new HashMap<>();
        data.put("projects", projectRepository.findAll());
        data.put("trainings", trainingRepository.findAll());
        return data;
    }
}