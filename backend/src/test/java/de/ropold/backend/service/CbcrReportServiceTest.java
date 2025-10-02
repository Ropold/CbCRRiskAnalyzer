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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import de.ropold.backend.exception.notfoundexceptions.CbcrNotFoundException;

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

    @Test
    void testGetCbcrReportById() {
        // Arrange
        UUID testId = allCbcrReports.get(0).getId();
        when(cbcrReportRepository.findById(testId)).thenReturn(Optional.of(allCbcrReports.get(0)));

        // Act
        CbcrReportResponse result = cbcrReportService.getCbcrReportById(testId);

        // Assert
        assertNotNull(result);
        assertEquals(testId, result.id());
        assertEquals("Test Company", result.company().name());
        assertEquals("DE", result.country().countryCode());
        assertEquals(BigDecimal.valueOf(8000000.00), result.revenuesTotal());
        assertEquals(2023, result.reportingYear());
        verify(cbcrReportRepository, times(1)).findById(testId);
    }

    @Test
    void testGetCbcrReportById_NotFound() {
        // Arrange
        UUID nonExistentId = UUID.randomUUID();
        when(cbcrReportRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act & Assert
        CbcrNotFoundException exception = assertThrows(
                CbcrNotFoundException.class,
                () -> cbcrReportService.getCbcrReportById(nonExistentId)
        );
        assertEquals("Cbcr Report not found with id: " + nonExistentId, exception.getMessage());
        verify(cbcrReportRepository, times(1)).findById(nonExistentId);
    }

    @Test
    void testAddCbcrReport() {
        // Arrange
        CbcrReportModel newReport = new CbcrReportModel(
                null,
                testCompany,
                2024,
                LocalDate.of(2024, 12, 31),
                testCountry,
                BigDecimal.valueOf(6000000.00),
                BigDecimal.valueOf(4000000.00),
                BigDecimal.valueOf(10000000.00),
                BigDecimal.valueOf(1500000.00),
                BigDecimal.valueOf(450000.00),
                BigDecimal.valueOf(450000.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(2500000.00),
                BigDecimal.valueOf(6000000.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(700000.00),
                180,
                BigDecimal.valueOf(55555.55),
                null,
                null,
                "IFRS",
                CbcrReportModel.AuditStatus.DRAFT,
                "Software Development",
                null,
                null
        );

        CbcrReportModel savedReport = new CbcrReportModel(
                UUID.randomUUID(),
                testCompany,
                2024,
                LocalDate.of(2024, 12, 31),
                testCountry,
                BigDecimal.valueOf(6000000.00),
                BigDecimal.valueOf(4000000.00),
                BigDecimal.valueOf(10000000.00),
                BigDecimal.valueOf(1500000.00),
                BigDecimal.valueOf(450000.00),
                BigDecimal.valueOf(450000.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(2500000.00),
                BigDecimal.valueOf(6000000.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(700000.00),
                180,
                BigDecimal.valueOf(55555.55),
                null,
                null,
                "IFRS",
                CbcrReportModel.AuditStatus.DRAFT,
                "Software Development",
                null,
                null
        );

        when(cbcrReportRepository.save(newReport)).thenReturn(savedReport);

        // Act
        CbcrReportModel result = cbcrReportService.addCbcrReport(newReport);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals(2024, result.getReportingYear());
        assertEquals(BigDecimal.valueOf(10000000.00), result.getRevenuesTotal());
        verify(cbcrReportRepository, times(1)).save(newReport);
    }

    @Test
    void testUpdateCbcrReport() {
        // Arrange
        CbcrReportModel existingReport = allCbcrReports.get(0);
        CbcrReportModel updatedReport = new CbcrReportModel(
                existingReport.getId(),
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testCountry,
                BigDecimal.valueOf(5500000.00),
                BigDecimal.valueOf(3500000.00),
                BigDecimal.valueOf(9000000.00),
                BigDecimal.valueOf(1400000.00),
                BigDecimal.valueOf(420000.00),
                BigDecimal.valueOf(420000.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(30.00),
                BigDecimal.valueOf(2200000.00),
                BigDecimal.valueOf(5500000.00),
                BigDecimal.valueOf(1700000.00),
                BigDecimal.valueOf(600000.00),
                160,
                BigDecimal.valueOf(56250.00),
                null,
                "Updated",
                "IFRS",
                CbcrReportModel.AuditStatus.IN_REVIEW,
                "Software Development - Updated",
                null,
                null
        );

        when(cbcrReportRepository.save(updatedReport)).thenReturn(updatedReport);

        // Act
        CbcrReportModel result = cbcrReportService.updateCbcrReport(updatedReport);

        // Assert
        assertNotNull(result);
        assertEquals(existingReport.getId(), result.getId());
        assertEquals(BigDecimal.valueOf(9000000.00), result.getRevenuesTotal());
        assertEquals("Updated", result.getTaxExplanation());
        verify(cbcrReportRepository, times(1)).save(updatedReport);
    }

    @Test
    void testDeleteCbcrReport() {
        // Arrange
        UUID testId = allCbcrReports.get(0).getId();
        when(cbcrReportRepository.findById(testId)).thenReturn(Optional.of(allCbcrReports.get(0)));
        doNothing().when(cbcrReportRepository).deleteById(testId);

        // Act
        cbcrReportService.deleteCbcrReport(testId);

        // Assert
        verify(cbcrReportRepository, times(1)).findById(testId);
        verify(cbcrReportRepository, times(1)).deleteById(testId);
    }

    @Test
    void testDeleteCbcrReport_NotFound() {
        // Arrange
        UUID nonExistentId = UUID.randomUUID();
        when(cbcrReportRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act & Assert
        CbcrNotFoundException exception = assertThrows(
                CbcrNotFoundException.class,
                () -> cbcrReportService.deleteCbcrReport(nonExistentId)
        );
        assertEquals("Cbcr Report not found with id: " + nonExistentId, exception.getMessage());
        verify(cbcrReportRepository, times(1)).findById(nonExistentId);
        verify(cbcrReportRepository, never()).deleteById(any());
    }

}
