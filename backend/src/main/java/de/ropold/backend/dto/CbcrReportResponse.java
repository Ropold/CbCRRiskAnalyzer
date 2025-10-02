package de.ropold.backend.dto;

import de.ropold.backend.model.CbcrReportModel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record CbcrReportResponse(
        UUID id,
        CompanyBasicInfo company,
        Integer reportingYear,
        LocalDate fiscalYearEnd,
        CountryBasicInfo country,
        BigDecimal revenuesUnrelatedParty,
        BigDecimal revenuesRelatedParty,
        BigDecimal revenuesTotal,
        BigDecimal profitBeforeTax,
        BigDecimal incomeTaxPaid,
        BigDecimal incomeTaxAccrued,
        BigDecimal effectiveTaxRate,
        BigDecimal expectedTaxRate,
        BigDecimal statedCapital,
        BigDecimal accumulatedEarnings,
        BigDecimal tangibleAssets,
        BigDecimal intangibleAssets,
        Integer numberOfEmployees,
        BigDecimal revenuePerEmployee,
        String commentReference,
        String taxExplanation,
        String dataSource,
        CbcrReportModel.AuditStatus auditStatus,
        String businessActivities,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}