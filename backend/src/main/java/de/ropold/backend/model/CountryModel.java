package de.ropold.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "countries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryModel {

    @Id
    private UUID id;

    @Column(name = "country_code", length = 2, unique = true, nullable = false)
    private String countryCode;

    @Column(name = "country_name", length = 100, unique = true, nullable = false)
    private String countryName;

    @Column(name = "region", length = 50)
    private String region;

    @Enumerated(EnumType.STRING)
    @Column(name = "jurisdiction_type", length = 20)
    private JurisdictionType jurisdictionType;

    @Column(name = "tax_haven", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean taxHaven = false;

    @Column(name = "expected_tax_rate", precision = 5, scale = 2)
    private BigDecimal expectedTaxRate;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum JurisdictionType {
        COUNTRY,
        TERRITORY,
        OFFSHORE
    }
}
