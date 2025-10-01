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
@Table(name = "risk_assessments", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cbcr_report_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskAssessmentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cbcr_report_id", nullable = false)
    private CbcrReportModel cbcrReport;

    @Enumerated(EnumType.STRING)
    @Column(name = "overall_risk_level", length = 20)
    private RiskLevel overallRiskLevel;

    @Column(name = "risk_score", precision = 5, scale = 2)
    private BigDecimal riskScore;

    @Column(name = "low_etr_flag", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean lowEtrFlag = false;

    @Column(name = "tax_haven_flag", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean taxHavenFlag = false;

    @Column(name = "profit_shifting_indicator", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean profitShiftingIndicator = false;

    @Column(name = "negative_tax_flag", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean negativeTaxFlag = false;

    @Column(name = "high_revenue_low_tax_flag", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean highRevenueLowTaxFlag = false;

    @Column(name = "substance_mismatch_flag", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean substanceMismatchFlag = false;

    @Column(name = "blacklist_jurisdiction_flag", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean blacklistJurisdictionFlag = false;

    @Column(name = "etr_variance", precision = 6, scale = 3)
    private BigDecimal etrVariance;

    @Column(name = "revenue_per_employee_ratio", precision = 12, scale = 2)
    private BigDecimal revenuePerEmployeeRatio;

    @Column(name = "profit_per_employee_ratio", precision = 12, scale = 2)
    private BigDecimal profitPerEmployeeRatio;

    @Column(name = "risk_explanation", columnDefinition = "TEXT")
    private String riskExplanation;

    @Column(name = "recommended_action", columnDefinition = "TEXT")
    private String recommendedAction;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum RiskLevel {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }
}