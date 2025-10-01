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
@Table(name = "subsidiaries", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"company_id", "name", "country_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubsidiaryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyModel company;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private CountryModel country;

    @Column(name = "lei_code", length = 20)
    private String leiCode;

    @Column(name = "tax_identification_number", length = 50)
    private String taxIdentificationNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "entity_type", length = 30)
    private EntityType entityType;

    @Enumerated(EnumType.STRING)
    @Column(name = "main_business_activity", length = 50)
    private MainBusinessActivity mainBusinessActivity;

    @Column(name = "additional_activities", columnDefinition = "TEXT")
    private String additionalActivities;

    @Column(name = "is_active", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum EntityType {
        SUBSIDIARY,
        BRANCH,
        PERMANENT_ESTABLISHMENT,
        JOINT_VENTURE,
        PARTNERSHIP
    }

    public enum MainBusinessActivity {
        RESEARCH_AND_DEVELOPMENT,
        HOLDING_OR_MANAGING_IP,
        PURCHASING_OR_PROCUREMENT,
        MANUFACTURING_OR_PRODUCTION,
        SALES_MARKETING_OR_DISTRIBUTION,
        ADMINISTRATIVE_MANAGEMENT_OR_SUPPORT_SERVICES,
        PROVISION_OF_SERVICES_TO_UNRELATED_PARTIES,
        INTERNAL_GROUP_FINANCE,
        REGULATED_FINANCIAL_SERVICES,
        INSURANCE,
        HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS,
        DORMANT,
        OTHER
    }
}