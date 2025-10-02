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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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

    @Autowired
    private ObjectMapper objectMapper;

    private CompanyModel testCompany;
    private CountryModel testGermany;
    private CountryModel testUsa;
    private CbcrReportModel testReport1;
    private CbcrReportModel testReport2;

    @BeforeEach
    void setUp() {
        cbcrReportRepository.deleteAll();
        companyRepository.deleteAll();
        countryRepository.deleteAll();

        // Create test company
        testCompany = new CompanyModel(
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
        testCompany = companyRepository.save(testCompany);

        // Create test countries
        testGermany = new CountryModel(
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
        testGermany = countryRepository.save(testGermany);

        testUsa = new CountryModel(
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
        testUsa = countryRepository.save(testUsa);

        // Create test CbCR reports
        testReport1 = new CbcrReportModel(
                null,
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testGermany,
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

        testReport2 = new CbcrReportModel(
                null,
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testUsa,
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

        testReport1 = cbcrReportRepository.save(testReport1);
        testReport2 = cbcrReportRepository.save(testReport2);
    }

    @Test
    void testGetAllCbcrReports() throws Exception {
        mockMvc.perform(get("/api/cbcr-reports"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].reportingYear").value(2023))
                .andExpect(jsonPath("$[1].reportingYear").value(2023));
    }

    @Test
    void testGetCbcrReportById() throws Exception {
        mockMvc.perform(get("/api/cbcr-reports/" + testReport1.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testReport1.getId().toString()))
                .andExpect(jsonPath("$.reportingYear").value(2023))
                .andExpect(jsonPath("$.company.name").value("TechCorp International"))
                .andExpect(jsonPath("$.country.countryCode").value("DE"))
                .andExpect(jsonPath("$.revenuesTotal").value(8000000.00))
                .andExpect(jsonPath("$.auditStatus").value("DRAFT"));
    }

    @Test
    void testGetCbcrReportById_NotFound() throws Exception {
        UUID nonExistentId = UUID.randomUUID();
        mockMvc.perform(get("/api/cbcr-reports/" + nonExistentId))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testAddCbcrReport() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        CbcrReportModel newReport = new CbcrReportModel(
                null,
                testCompany,
                2024,
                LocalDate.of(2024, 12, 31),
                testGermany,
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

        String jsonRequest = objectMapper.writeValueAsString(newReport);

        mockMvc.perform(post("/api/cbcr-reports")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.reportingYear").value(2024))
                .andExpect(jsonPath("$.revenuesTotal").value(10000000.00));
    }

    @Test
    void testAddCbcrReport_Unauthorized() throws Exception {
        CbcrReportModel newReport = new CbcrReportModel(
                null,
                testCompany,
                2024,
                LocalDate.of(2024, 12, 31),
                testGermany,
                BigDecimal.valueOf(6000000.00),
                BigDecimal.valueOf(4000000.00),
                BigDecimal.valueOf(10000000.00),
                null, null, null, null, null, null, null, null, null, null, null,
                null, null, "IFRS", CbcrReportModel.AuditStatus.DRAFT, null, null, null
        );

        String jsonRequest = objectMapper.writeValueAsString(newReport);

        mockMvc.perform(post("/api/cbcr-reports")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateCbcrReport() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        CbcrReportModel updatedReport = new CbcrReportModel(
                testReport1.getId(),
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testGermany,
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
                "Updated via test",
                "IFRS",
                CbcrReportModel.AuditStatus.IN_REVIEW,
                "Software Development, Cloud Services - Updated",
                null,
                null
        );

        String jsonRequest = objectMapper.writeValueAsString(updatedReport);

        mockMvc.perform(put("/api/cbcr-reports/" + testReport1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.revenuesTotal").value(9000000.00))
                .andExpect(jsonPath("$.taxExplanation").value("Updated via test"))
                .andExpect(jsonPath("$.auditStatus").value("IN_REVIEW"));
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateCbcrReport_NotFound() throws Exception {
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
        CbcrReportModel updatedReport = new CbcrReportModel(
                nonExistentId,
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testGermany,
                BigDecimal.valueOf(5500000.00),
                null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, "IFRS", CbcrReportModel.AuditStatus.DRAFT, null, null, null
        );

        String jsonRequest = objectMapper.writeValueAsString(updatedReport);

        mockMvc.perform(put("/api/cbcr-reports/" + nonExistentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateCbcrReport_Unauthorized() throws Exception {
        CbcrReportModel updatedReport = new CbcrReportModel(
                testReport1.getId(),
                testCompany,
                2023,
                LocalDate.of(2023, 12, 31),
                testGermany,
                BigDecimal.valueOf(5500000.00),
                null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, "IFRS", CbcrReportModel.AuditStatus.DRAFT, null, null, null
        );

        String jsonRequest = objectMapper.writeValueAsString(updatedReport);

        mockMvc.perform(put("/api/cbcr-reports/" + testReport1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteCbcrReport() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        mockMvc.perform(delete("/api/cbcr-reports/" + testReport1.getId()))
                .andExpect(status().isNoContent());

        // Verify deletion
        mockMvc.perform(get("/api/cbcr-reports/" + testReport1.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteCbcrReport_Unauthorized() throws Exception {
        mockMvc.perform(delete("/api/cbcr-reports/" + testReport1.getId()))
                .andExpect(status().isForbidden());
    }


}
