package com.sanjayverma.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String title;
    private String description;
    private List<String> tags;
    private boolean isFeatured;
    private Date completionDate;
    private int complexity;
}
