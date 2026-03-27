package com.sanjayverma.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sanjayverma.portfolio.model.Certification;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
}