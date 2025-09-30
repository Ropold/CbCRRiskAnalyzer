package de.ropold.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyModel {

    @Id
    private UUID id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "industry", length = 100)
    private String industry;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "headquarters_country_id", referencedColumnName = "id")
    private CountryModel headquartersCountry;

    @Column(name = "reporting_currency", length = 3, columnDefinition = "VARCHAR(3) DEFAULT 'EUR'")
    private String reportingCurrency = "EUR";

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}