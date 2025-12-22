package com.sanjayverma.portfolio.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "visitors")
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String page;
    private String device;
    private String ip;
    private LocalDateTime visitTime;

    public Long getId() { return id; }

    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }

    public String getDevice() { return device; }
    public void setDevice(String device) { this.device = device; }

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    public LocalDateTime getVisitTime() { return visitTime; }
    public void setVisitTime(LocalDateTime visitTime) { this.visitTime = visitTime; }
}
