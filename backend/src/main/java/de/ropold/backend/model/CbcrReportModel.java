package de.ropold.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "cbcr_reports", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"company_id", "reporting_year", "country_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CbcrReportModel {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyModel company;

    @Column(name = "reporting_year", nullable = false)
    private Integer reportingYear;

    @Column(name = "fiscal_year_end")
    private LocalDate fiscalYearEnd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private CountryModel country;

    @Column(name = "revenues_unrelated_party", precision = 15, scale = 2)
    private BigDecimal revenuesUnrelatedParty;

    @Column(name = "revenues_related_party", precision = 15, scale = 2)
    private BigDecimal revenuesRelatedParty;

    @Column(name = "revenues_total", precision = 15, scale = 2)
    private BigDecimal revenuesTotal;

    @Column(name = "profit_before_tax", precision = 15, scale = 2)
    private BigDecimal profitBeforeTax;

    @Column(name = "income_tax_paid", precision = 15, scale = 2)
    private BigDecimal incomeTaxPaid;

    @Column(name = "income_tax_accrued", precision = 15, scale = 2)
    private BigDecimal incomeTaxAccrued;

    @Column(name = "effective_tax_rate", precision = 6, scale = 3)
    private BigDecimal effectiveTaxRate;

    @Column(name = "expected_tax_rate", precision = 5, scale = 2)
    private BigDecimal expectedTaxRate;

    @Column(name = "stated_capital", precision = 15, scale = 2)
    private BigDecimal statedCapital;

    @Column(name = "accumulated_earnings", precision = 15, scale = 2)
    private BigDecimal accumulatedEarnings;

    @Column(name = "tangible_assets", precision = 15, scale = 2)
    private BigDecimal tangibleAssets;

    @Column(name = "number_of_employees")
    private Integer numberOfEmployees;

    @Column(name = "revenue_per_employee", precision = 10, scale = 2)
    private BigDecimal revenuePerEmployee;

    @Column(name = "comment_reference", length = 10)
    private String commentReference;

    @Column(name = "tax_explanation", columnDefinition = "TEXT")
    private String taxExplanation;

    @Column(name = "data_source", length = 20, columnDefinition = "VARCHAR(20) DEFAULT 'IFRS'")
    private String dataSource = "IFRS";

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}