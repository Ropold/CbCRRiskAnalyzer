package de.ropold.backend.service;

import de.ropold.backend.dto.CbcrReportResponse;
import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CbcrReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CbcrReportServiceTest {

    CbcrReportRepository cbcrReportRepository = mock(CbcrReportRepository.class);
    CbcrReportService cbcrReportService = new CbcrReportService(cbcrReportRepository);

    List<CbcrReportModel> allCbcrReports;
    CompanyModel testCompany;
    CountryModel testCountry;

    @BeforeEach
    void setUp() {
        // Create test company
        testCompany = new CompanyModel(
                UUID.randomUUID(),
                "Test Company",
                "Technology",
                null,
                "EUR",
                "DE123456789",
                "TEST123456789",
                null,
                true,
                "Full",
                BigDecimal.valueOf(750000000),
                null,
                null,
                null
        );

        // Create test country
        testCountry = new CountryModel(
                UUID.randomUUID(),
                "DE",
                "Germany",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(30.00),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );

        // Create test CbCR reports
        CbcrReportModel cbcrReportModel1 = new CbcrReportModel(
                UUID.randomUUID(),
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testCountry,
                BigDecimal.valueOf(5000000.00),
                BigDecimal.valueOf(3000000.00),
                BigDecimal.valueOf(8000000.00),
                BigDecimal.valueOf(1200000.00),
                BigDecimal.valueOf(360000.00),
                BigDecimal.valueOf(360000.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(5000000.00),
                BigDecimal.valueOf(1500000.00),
                BigDecimal.valueOf(500000.00),
                150,
                BigDecimal.valueOf(53333.33),
                null,
                null,
                "IFRS",
                CbcrReportModel.AuditStatus.DRAFT,
                "Software Development",
                null,
                null
        );

        CbcrReportModel cbcrReportModel2 = new CbcrReportModel(
                UUID.randomUUID(),
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testCountry,
                BigDecimal.valueOf(10000000.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(12000000.00),
                BigDecimal.valueOf(2500000.00),
                BigDecimal.valueOf(525000.00),
                BigDecimal.valueOf(525000.00),
                BigDecimal.valueOf(21.00),
                BigDecimal.valueOf(21.00),
                BigDecimal.valueOf(3000000.00),
                BigDecimal.valueOf(8000000.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(1000000.00),
                200,
                BigDecimal.valueOf(60000.00),
                null,
                null,
                "IFRS",
                CbcrReportModel.AuditStatus.IN_REVIEW,
                "Sales, Marketing",
                null,
                null
        );

        allCbcrReports = List.of(cbcrReportModel1, cbcrReportModel2);
        when(cbcrReportRepository.findAll()).thenReturn(allCbcrReports);
    }

    @Test
    void testGetAllCbcrReports() {
        // Act
        List<CbcrReportResponse> result = cbcrReportService.getAllCbcrReports();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Test Company", result.get(0).company().name());
        assertEquals("DE", result.get(0).country().countryCode());
        assertEquals(BigDecimal.valueOf(8000000.00), result.get(0).revenuesTotal());
        assertEquals(BigDecimal.valueOf(12000000.00), result.get(1).revenuesTotal());
    }

}
