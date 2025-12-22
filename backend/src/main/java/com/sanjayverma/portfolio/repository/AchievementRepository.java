package com.sanjayverma.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sanjayverma.portfolio.model.Achievement;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
