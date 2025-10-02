package de.ropold.backend.service;

import de.ropold.backend.dto.RiskAssessmentResponse;
import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.model.RiskAssessmentModel;
import de.ropold.backend.repository.RiskAssessmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RiskAssessmentServiceTest {

    RiskAssessmentRepository riskAssessmentRepository = mock(RiskAssessmentRepository.class);
    RiskAssessmentService riskAssessmentService = new RiskAssessmentService(riskAssessmentRepository);

    List<RiskAssessmentModel> allRiskAssessments;

    @BeforeEach
    void setUp() {
        CountryModel country = new CountryModel(
                UUID.randomUUID(),
                "DE",
                "Germany",
                null,
                null,
                false,
                null,
                null,
                false,
                false,
                null,
                null
        );

        CompanyModel company = new CompanyModel(
                UUID.randomUUID(),
                "Test Company",
                "Technology",
                null,
                "EUR",
                null,
                null,
                null,
                true,
                null,
                null,
                null,
                null,
                null
        );

        CbcrReportModel cbcrReport = new CbcrReportModel(
                UUID.randomUUID(),          // id
                company,                     // company
                2024,                        // reportingYear
                null,                        // fiscalYearEnd
                country,                     // country
                null,                        // revenuesUnrelatedParty
                null,                        // revenuesRelatedParty
                BigDecimal.valueOf(1000000), // revenuesTotal
                BigDecimal.valueOf(200000),  // profitBeforeTax
                null,                        // incomeTaxPaid
                null,                        // incomeTaxAccrued
                null,                        // effectiveTaxRate
                null,                        // expectedTaxRate
                null,                        // statedCapital
                null,                        // accumulatedEarnings
                null,                        // tangibleAssets
                null,                        // intangibleAssets
                null,                        // numberOfEmployees
                null,                        // revenuePerEmployee
                null,                        // commentReference
                null,                        // taxExplanation
                "IFRS",                      // dataSource
                CbcrReportModel.AuditStatus.DRAFT, // auditStatus
                null,                        // businessActivities
                null,                        // createdAt
                null                         // updatedAt
        );

        RiskAssessmentModel riskAssessmentModel1 = new RiskAssessmentModel(
                null,
                cbcrReport,
                RiskAssessmentModel.RiskLevel.LOW,
                null,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
        RiskAssessmentModel riskAssessmentModel2 = new RiskAssessmentModel(
                null,
                cbcrReport,
                RiskAssessmentModel.RiskLevel.HIGH,
                null,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );

        allRiskAssessments = List.of(riskAssessmentModel1, riskAssessmentModel2);
        when(riskAssessmentRepository.findAll()).thenReturn(allRiskAssessments);
    }

    @Test
    void testGetAllRiskAssessments() {
        List<RiskAssessmentResponse> result = riskAssessmentService.getAllRiskAssessments();

        assertEquals(2, result.size());
        assertEquals(RiskAssessmentModel.RiskLevel.LOW, result.get(0).overallRiskLevel());
        assertEquals(RiskAssessmentModel.RiskLevel.HIGH, result.get(1).overallRiskLevel());
    }

}
