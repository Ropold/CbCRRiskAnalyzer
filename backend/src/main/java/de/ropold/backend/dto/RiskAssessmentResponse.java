package de.ropold.backend.dto;

import de.ropold.backend.model.RiskAssessmentModel;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record RiskAssessmentResponse(
        UUID id,
        CbcrReportBasicInfo cbcrReport,
        RiskAssessmentModel.RiskLevel overallRiskLevel,
        BigDecimal riskScore,
        Boolean lowEtrFlag,
        Boolean taxHavenFlag,
        Boolean profitShiftingIndicator,
        Boolean negativeTaxFlag,
        Boolean highRevenueLowTaxFlag,
        Boolean substanceMismatchFlag,
        Boolean blacklistJurisdictionFlag,
        BigDecimal etrVariance,
        BigDecimal revenuePerEmployeeRatio,
        BigDecimal profitPerEmployeeRatio,
        String riskExplanation,
        String recommendedAction,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}