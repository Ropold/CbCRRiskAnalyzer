package de.ropold.backend.controller;

import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.model.RiskAssessmentModel;
import de.ropold.backend.repository.CbcrReportRepository;
import de.ropold.backend.repository.CompanyRepository;
import de.ropold.backend.repository.CountryRepository;
import de.ropold.backend.repository.RiskAssessmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class RiskAssessmentControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RiskAssessmentRepository riskAssessmentRepository;

    @Autowired
    private CbcrReportRepository cbcrReportRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CountryRepository countryRepository;

    @BeforeEach
    void setUp() {
        riskAssessmentRepository.deleteAll();
        cbcrReportRepository.deleteAll();
        companyRepository.deleteAll();
        countryRepository.deleteAll();

        // Create test company
        CompanyModel testCompany = new CompanyModel(
                null,
                "Risk Test Corp",
                "Finance",
                null,
                "USD",
                "US987654321",
                "TEST987654321",
                null,
                true,
                "Full",
                BigDecimal.valueOf(850000000),
                null,
                null,
                null
        );
        testCompany = companyRepository.save(testCompany);

        // Create test countries
        CountryModel caymanIslands = new CountryModel(
                null,
                "KY",
                "Cayman Islands",
                "Caribbean",
                CountryModel.JurisdictionType.COUNTRY,
                true,  // Tax haven
                BigDecimal.valueOf(0.00),
                BigDecimal.valueOf(0.00),
                false,
                false,
                CountryModel.BlacklistStatus.EU_BLACKLIST,
                null
        );
        caymanIslands = countryRepository.save(caymanIslands);

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
        CbcrReportModel testCbcrReport1 = new CbcrReportModel(
                null,
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                caymanIslands,
                BigDecimal.valueOf(15000000.00),
                BigDecimal.valueOf(5000000.00),
                BigDecimal.valueOf(20000000.00),
                BigDecimal.valueOf(8000000.00),
                BigDecimal.valueOf(50000.00),
                BigDecimal.valueOf(50000.00),
                BigDecimal.valueOf(0.625),  // Low ETR
                BigDecimal.valueOf(0.00),
                BigDecimal.valueOf(5000000.00),
                BigDecimal.valueOf(15000000.00),
                BigDecimal.valueOf(3000000.00),
                BigDecimal.valueOf(2000000.00),
                5,  // Very few employees - substance issue
                BigDecimal.valueOf(4000000.00),
                null,
                null,
                "IFRS",
                CbcrReportModel.AuditStatus.DRAFT,
                "Holding Company",
                null,
                null
        );
        testCbcrReport1 = cbcrReportRepository.save(testCbcrReport1);

        CbcrReportModel testCbcrReport2 = new CbcrReportModel(
                null,
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                usa,
                BigDecimal.valueOf(50000000.00),
                BigDecimal.valueOf(10000000.00),
                BigDecimal.valueOf(60000000.00),
                BigDecimal.valueOf(10000000.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(2000000.00),
                BigDecimal.valueOf(20.00),
                BigDecimal.valueOf(21.00),
                BigDecimal.valueOf(20000000.00),
                BigDecimal.valueOf(40000000.00),
                BigDecimal.valueOf(15000000.00),
                BigDecimal.valueOf(8000000.00),
                500,
                BigDecimal.valueOf(120000.00),
                null,
                null,
                "IFRS",
                CbcrReportModel.AuditStatus.IN_REVIEW,
                "Manufacturing, Sales",
                null,
                null
        );
        testCbcrReport2 = cbcrReportRepository.save(testCbcrReport2);

        // Create test risk assessments
        RiskAssessmentModel riskAssessmentModel1 = new RiskAssessmentModel(
                null,
                testCbcrReport1,
                RiskAssessmentModel.RiskLevel.CRITICAL,
                BigDecimal.valueOf(95.50),
                true,   // Low ETR
                true,   // Tax haven
                true,   // Profit shifting
                false,
                true,   // High revenue low tax
                true,   // Substance mismatch
                true,   // Blacklist jurisdiction
                BigDecimal.valueOf(-0.375),  // ETR variance
                BigDecimal.valueOf(4000000.00),
                BigDecimal.valueOf(1600000.00),
                "Critical risk: Tax haven jurisdiction with minimal substance, very low ETR",
                "Immediate review required - substance and transfer pricing documentation needed",
                null,
                null
        );

        RiskAssessmentModel riskAssessmentModel2 = new RiskAssessmentModel(
                null,
                testCbcrReport2,
                RiskAssessmentModel.RiskLevel.LOW,
                BigDecimal.valueOf(15.00),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                BigDecimal.valueOf(-1.00),  // ETR variance
                BigDecimal.valueOf(120000.00),
                BigDecimal.valueOf(20000.00),
                "Low risk: Normal business operations with appropriate substance",
                "Continue monitoring - standard compliance procedures",
                null,
                null
        );

        riskAssessmentRepository.saveAll(List.of(riskAssessmentModel1, riskAssessmentModel2));
    }
}
