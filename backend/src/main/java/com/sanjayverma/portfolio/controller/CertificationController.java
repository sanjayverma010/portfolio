package com.sanjayverma.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjayverma.portfolio.model.Certification;
import com.sanjayverma.portfolio.repository.CertificationRepository;

@RestController
@RequestMapping({ "/api/certifications", "/certifications" })
@CrossOrigin(origins = "http://localhost:3000")
public class CertificationController {

    private final CertificationRepository certificationRepository;

    public CertificationController(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    // --------------------------------------------------
    // GET ALL CERTIFICATIONS
    // --------------------------------------------------
    @GetMapping
    public ResponseEntity<List<Certification>> getAllCertifications() {

        List<Certification> certifications = certificationRepository.findAll();

        return ResponseEntity.ok(certifications);
    }

    // --------------------------------------------------
    // GET CERTIFICATION BY ID
    // --------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<Certification> getCertificationById(@PathVariable Long id) {

        Optional<Certification> certification = certificationRepository.findById(id);

        return certification.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // --------------------------------------------------
    // CREATE CERTIFICATION
    // --------------------------------------------------
    @PostMapping
    public ResponseEntity<Certification> createCertification(@RequestBody Certification certification) {

        Certification savedCertification = certificationRepository.save(certification);

        return ResponseEntity.ok(savedCertification);
    }

    // --------------------------------------------------
    // UPDATE CERTIFICATION
    // --------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id,
            @RequestBody Certification certificationDetails) {

        Optional<Certification> optionalCertification = certificationRepository.findById(id);

        if (optionalCertification.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Certification certification = optionalCertification.get();

        certification.setTitle(certificationDetails.getTitle());
        certification.setOrganization(certificationDetails.getOrganization());
        certification.setYear(certificationDetails.getYear());
        certification.setCertificateLink(certificationDetails.getCertificateLink());

        Certification updatedCertification = certificationRepository.save(certification);

        return ResponseEntity.ok(updatedCertification);
    }

    // --------------------------------------------------
    // DELETE CERTIFICATION
    // --------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {

        if (!certificationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        certificationRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}