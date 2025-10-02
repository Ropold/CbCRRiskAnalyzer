package de.ropold.backend.controller;

import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CbcrReportRepository;
import de.ropold.backend.repository.CompanyRepository;
import de.ropold.backend.repository.CountryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class CbcrReportControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CbcrReportRepository cbcrReportRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CountryRepository countryRepository;

    @BeforeEach
    void setUp() {
        cbcrReportRepository.deleteAll();
        companyRepository.deleteAll();
        countryRepository.deleteAll();

        // Create test company
        CompanyModel company = new CompanyModel(
                null,
                "TechCorp International",
                "Technology",
                null,
                "EUR",
                "DE123456789",
                "529900T8BM49AURSDO55",
                null,
                true,
                "Full",
                BigDecimal.valueOf(750000000),
                null,
                null,
                null
        );
        company = companyRepository.save(company);

        // Create test countries
        CountryModel germany = new CountryModel(
                null,
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
        germany = countryRepository.save(germany);

        CountryModel usa = new CountryModel(
                null,
                "US",
                "United States",
                "North America",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                BigDecimal.valueOf(21.00),
                BigDecimal.valueOf(21.00),
                false,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );
        usa = countryRepository.save(usa);

        // Create test CbCR reports
        CbcrReportModel cbcrReportModel1 = new CbcrReportModel(
                null,
                company,
                2023,
                LocalDate.of(2023, 12, 31),
                germany,
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
                "Software Development, Cloud Services",
                null,
                null
        );

        CbcrReportModel cbcrReportModel2 = new CbcrReportModel(
                null,
                company,
                2023,
                LocalDate.of(2023, 12, 31),
                usa,
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
                "Sales, Marketing, R&D",
                null,
                null
        );

        cbcrReportRepository.saveAll(List.of(cbcrReportModel1, cbcrReportModel2));
    }

    @Test
    void testGetAllCbcrReports() throws Exception {
        mockMvc.perform(get("/api/cbcr-reports"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].reportingYear").value(2023))
                .andExpect(jsonPath("$[1].reportingYear").value(2023));
    }

}
