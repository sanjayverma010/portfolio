package com.sanjayverma.portfolio.repository;

import com.sanjayverma.portfolio.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    // Find projects by title (case-insensitive)
    List<Project> findByTitleContainingIgnoreCase(String title);

    // Find featured projects with a specific tag
    @Query("{ 'tags': ?0, 'isFeatured': true }")
    List<Project> findFeaturedProjectsByTag(String tag);

    // Get all project tags
    @Query(value = "{}", fields = "{ 'tags': 1 }")
    List<Project> findAllProjectTags();

    // Find projects by date & complexity
    @Query(value = "{ $and: [ { 'completionDate': { $gte: ?0 } }, { 'complexity': { $lte: ?1 } } ] }")
    List<Project> findProjectsByDateAndComplexity(Date startDate, int maxComplexity);
}
