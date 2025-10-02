package de.ropold.backend.controller;

import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.model.RiskAssessmentModel;
import de.ropold.backend.repository.CbcrReportRepository;
import de.ropold.backend.repository.CompanyRepository;
import de.ropold.backend.repository.CountryRepository;
import de.ropold.backend.repository.RiskAssessmentRepository;
import de.ropold.backend.repository.SubsidiaryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private SubsidiaryRepository subsidiaryRepository;

    private RiskAssessmentModel testRiskAssessment1;
    private RiskAssessmentModel testRiskAssessment2;
    private CbcrReportModel testCbcrReport1;
    private CbcrReportModel testCbcrReport2;

    @BeforeEach
    void setUp() {
        riskAssessmentRepository.deleteAll();
        cbcrReportRepository.deleteAll();
        subsidiaryRepository.deleteAll();
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

        this.testCbcrReport1 = testCbcrReport1;
        this.testCbcrReport2 = testCbcrReport2;

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

        testRiskAssessment1 = riskAssessmentRepository.save(riskAssessmentModel1);
        testRiskAssessment2 = riskAssessmentRepository.save(riskAssessmentModel2);
    }

    @Test
    void testGetAllRiskAssessments() throws Exception{
        mockMvc.perform(get("/api/risk-assessments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].overallRiskLevel").value("CRITICAL"))
                .andExpect(jsonPath("$[1].overallRiskLevel").value("LOW"));
    }

    @Test
    void testGetRiskAssessmentById() throws Exception {
        mockMvc.perform(get("/api/risk-assessments/" + testRiskAssessment1.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testRiskAssessment1.getId().toString()))
                .andExpect(jsonPath("$.overallRiskLevel").value("CRITICAL"))
                .andExpect(jsonPath("$.riskScore").value(95.50))
                .andExpect(jsonPath("$.taxHavenFlag").value(true))
                .andExpect(jsonPath("$.cbcrReport.country.countryCode").value("KY"));
    }

    @Test
    void testGetRiskAssessmentById_NotFound() throws Exception {
        UUID nonExistentId = UUID.randomUUID();
        mockMvc.perform(get("/api/risk-assessments/" + nonExistentId))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testAddRiskAssessment() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        // Delete existing risk assessment for testCbcrReport2 to avoid unique constraint violation
        riskAssessmentRepository.delete(testRiskAssessment2);

        RiskAssessmentModel newRiskAssessment = new RiskAssessmentModel(
                null,
                testCbcrReport2,
                RiskAssessmentModel.RiskLevel.MEDIUM,
                BigDecimal.valueOf(55.00),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                BigDecimal.valueOf(-5.00),
                BigDecimal.valueOf(150000.00),
                BigDecimal.valueOf(25000.00),
                "Medium risk assessment",
                "Monitor closely",
                null,
                null
        );

        String jsonRequest = objectMapper.writeValueAsString(newRiskAssessment);

        mockMvc.perform(post("/api/risk-assessments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.overallRiskLevel").value("MEDIUM"))
                .andExpect(jsonPath("$.riskScore").value(55.00));
    }

    @Test
    void testAddRiskAssessment_Unauthorized() throws Exception {
        RiskAssessmentModel newRiskAssessment = new RiskAssessmentModel(
                null,
                testCbcrReport1,
                RiskAssessmentModel.RiskLevel.MEDIUM,
                BigDecimal.valueOf(55.00),
                false, false, false, false, false, false, false,
                null, null, null, null, null, null, null
        );

        String jsonRequest = objectMapper.writeValueAsString(newRiskAssessment);

        mockMvc.perform(post("/api/risk-assessments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateRiskAssessment() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        RiskAssessmentModel updatedRiskAssessment = new RiskAssessmentModel(
                testRiskAssessment1.getId(),
                testCbcrReport1,
                RiskAssessmentModel.RiskLevel.HIGH,
                BigDecimal.valueOf(85.00),
                true,
                true,
                true,
                false,
                true,
                true,
                true,
                BigDecimal.valueOf(-2.00),
                BigDecimal.valueOf(3500000.00),
                BigDecimal.valueOf(1400000.00),
                "Updated: High risk - requires immediate attention",
                "Updated: Full audit recommended",
                null,
                null
        );

        String jsonRequest = objectMapper.writeValueAsString(updatedRiskAssessment);

        mockMvc.perform(put("/api/risk-assessments/" + testRiskAssessment1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.overallRiskLevel").value("HIGH"))
                .andExpect(jsonPath("$.riskScore").value(85.00))
                .andExpect(jsonPath("$.riskExplanation").value("Updated: High risk - requires immediate attention"));
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateRiskAssessment_NotFound() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        UUID nonExistentId = UUID.randomUUID();
        RiskAssessmentModel updatedRiskAssessment = new RiskAssessmentModel(
                nonExistentId,
                testCbcrReport1,
                RiskAssessmentModel.RiskLevel.HIGH,
                BigDecimal.valueOf(85.00),
                true, true, true, false, true, true, true,
                null, null, null, null, null, null, null
        );

        String jsonRequest = objectMapper.writeValueAsString(updatedRiskAssessment);

        mockMvc.perform(put("/api/risk-assessments/" + nonExistentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateRiskAssessment_Unauthorized() throws Exception {
        RiskAssessmentModel updatedRiskAssessment = new RiskAssessmentModel(
                testRiskAssessment1.getId(),
                testCbcrReport1,
                RiskAssessmentModel.RiskLevel.HIGH,
                BigDecimal.valueOf(85.00),
                true, true, true, false, true, true, true,
                null, null, null, null, null, null, null
        );

        String jsonRequest = objectMapper.writeValueAsString(updatedRiskAssessment);

        mockMvc.perform(put("/api/risk-assessments/" + testRiskAssessment1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteRiskAssessment() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        mockMvc.perform(delete("/api/risk-assessments/" + testRiskAssessment1.getId()))
                .andExpect(status().isNoContent());

        // Verify deletion
        mockMvc.perform(get("/api/risk-assessments/" + testRiskAssessment1.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteRiskAssessment_Unauthorized() throws Exception {
        mockMvc.perform(delete("/api/risk-assessments/" + testRiskAssessment1.getId()))
                .andExpect(status().isForbidden());
    }
}
