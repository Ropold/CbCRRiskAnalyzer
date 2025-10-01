package de.ropold.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @Column(name = "tax_identification_number", length = 50)
    private String taxIdentificationNumber;

    @Column(name = "lei_code", length = 20)
    private String leiCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_company_id", referencedColumnName = "id")
    private CompanyModel parentCompany;

    @Column(name = "is_ultimate_parent", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isUltimateParent = true;

    @Column(name = "consolidation_scope", length = 50)
    private String consolidationScope;

    @Column(name = "cbcr_reporting_threshold", precision = 15, scale = 2)
    private BigDecimal cbcrReportingThreshold;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}