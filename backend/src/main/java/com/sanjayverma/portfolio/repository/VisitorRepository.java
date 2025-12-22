package com.sanjayverma.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sanjayverma.portfolio.model.Visitor;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findAllByOrderByVisitTimeDesc();
}
