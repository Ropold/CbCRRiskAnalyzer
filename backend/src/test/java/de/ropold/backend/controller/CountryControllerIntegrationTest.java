package de.ropold.backend.controller;

import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CbcrReportRepository;
import de.ropold.backend.repository.CompanyRepository;
import de.ropold.backend.repository.CountryRepository;
import de.ropold.backend.repository.RiskAssessmentRepository;
import de.ropold.backend.repository.SubsidiaryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CountryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private RiskAssessmentRepository riskAssessmentRepository;

    @Autowired
    private CbcrReportRepository cbcrReportRepository;

    @Autowired
    private SubsidiaryRepository subsidiaryRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @BeforeEach
    void setUp() {
        // Delete in correct order to respect foreign key constraints
        riskAssessmentRepository.deleteAll();
        cbcrReportRepository.deleteAll();
        subsidiaryRepository.deleteAll();
        companyRepository.deleteAll();
        countryRepository.deleteAll();

        CountryModel countryModel1 = new CountryModel(
                null,
                "DE",
                "Germany",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("30.00"),
                new java.math.BigDecimal("29.90"),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );

        CountryModel countryModel2 = new CountryModel(
                null,
                "US",
                "United States",
                "North America",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("21.00"),
                new java.math.BigDecimal("21.00"),
                false,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );

        countryRepository.saveAll(List.of(countryModel1, countryModel2));
    }

    @Test
    void testGetAllCountries() throws Exception {
        mockMvc.perform(get("/api/countries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].countryName").value("Germany"))
                .andExpect(jsonPath("$[1].countryName").value("United States"));
    }

    @Test
    void testGetCountryById() throws Exception {
        CountryModel savedCountry = countryRepository.findAll().getFirst();

        mockMvc.perform(get("/api/countries/" + savedCountry.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.countryName").value("Germany"))
                .andExpect(jsonPath("$.countryCode").value("DE"));
    }

    @Test
    void testGetCustomerById_notFound() throws Exception {
        mockMvc.perform(get("/api/countries/00000000-0000-0000-0000-000000000000"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testAddCountry_shouldReturnCreated() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        countryRepository.deleteAll();

        String newCountryJson = """
                {
                    "countryCode": "FR",
                    "countryName": "France",
                    "region": "Europe",
                    "jurisdictionType": "COUNTRY",
                    "taxHaven": false,
                    "expectedTaxRate": 25.00,
                    "statutoryTaxRate": 25.00,
                    "isEuMember": true,
                    "isOecdMember": true,
                    "blacklistStatus": "NONE"
                }
                """;

        mockMvc.perform(post("/api/countries")
                        .contentType(APPLICATION_JSON)
                        .content(newCountryJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.countryName").value("France"))
                .andExpect(jsonPath("$.countryCode").value("FR"));

        List<CountryModel> allCountries = countryRepository.findAll();
        Assertions.assertEquals(1, allCountries.size());
    }

    @Test
    void testAddCountry_unauthenticated_shouldReturnUnauthorized() throws Exception {
        String newCountryJson = """
                {
                    "countryCode": "FR",
                    "countryName": "France",
                    "region": "Europe",
                    "jurisdictionType": "COUNTRY",
                    "taxHaven": false,
                    "expectedTaxRate": 25.00,
                    "statutoryTaxRate": 25.00,
                    "isEuMember": true,
                    "isOecdMember": true,
                    "blacklistStatus": "NONE"
                }
                """;

        mockMvc.perform(post("/api/countries")
                        .contentType(APPLICATION_JSON)
                        .content(newCountryJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateCountry_shouldReturnUpdated() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        CountryModel existingCountry = countryRepository.findAll().getFirst();

        String updatedCountryJson = """
                {
                    "countryCode": "DE",
                    "countryName": "Germany",
                    "region": "Europe",
                    "jurisdictionType": "COUNTRY",
                    "taxHaven": true,
                    "expectedTaxRate": 35.00,
                    "statutoryTaxRate": 34.50,
                    "isEuMember": true,
                    "isOecdMember": true,
                    "blacklistStatus": "EU_GREYLIST"
                }
                """;

        mockMvc.perform(put("/api/countries/" + existingCountry.getId())
                        .contentType(APPLICATION_JSON)
                        .content(updatedCountryJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.taxHaven").value(true))
                .andExpect(jsonPath("$.expectedTaxRate").value(35.00))
                .andExpect(jsonPath("$.blacklistStatus").value("EU_GREYLIST"));

        CountryModel updated = countryRepository.findById(existingCountry.getId()).orElseThrow();
        Assertions.assertTrue(updated.getTaxHaven());
        Assertions.assertEquals("EU_GREYLIST", updated.getBlacklistStatus().toString());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteCountry_shouldReturnNoContent() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        CountryModel existingCountry = countryRepository.findAll().getFirst();

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete("/api/countries/" + existingCountry.getId()))
                .andExpect(status().isNoContent());

        boolean exists = countryRepository.existsById(existingCountry.getId());
        Assertions.assertFalse(exists);
    }

    @Test
    void testDeleteCountry_unauthenticated_shouldReturnUnauthorized() throws Exception {
        CountryModel existingCountry = countryRepository.findAll().getFirst();

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete("/api/countries/" + existingCountry.getId()))
                .andExpect(status().isUnauthorized());

        boolean exists = countryRepository.existsById(existingCountry.getId());
        Assertions.assertTrue(exists);
    }

    @Test
    void testUpdateCountry_unauthenticated_shouldReturnUnauthorized() throws Exception {
        CountryModel existingCountry = countryRepository.findAll().getFirst();

        String updatedCountryJson = """
                {
                    "countryCode": "DE",
                    "countryName": "Germany",
                    "region": "Europe",
                    "jurisdictionType": "COUNTRY",
                    "taxHaven": true,
                    "expectedTaxRate": 35.00,
                    "statutoryTaxRate": 34.50,
                    "isEuMember": true,
                    "isOecdMember": true,
                    "blacklistStatus": "EU_GREYLIST"
                }
                """;

        mockMvc.perform(put("/api/countries/" + existingCountry.getId())
                        .contentType(APPLICATION_JSON)
                        .content(updatedCountryJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testAddCountry_withNullAuthentication_shouldThrowAccessDenied() throws Exception {
        String newCountryJson = """
                {
                    "countryCode": "FR",
                    "countryName": "France",
                    "region": "Europe",
                    "jurisdictionType": "COUNTRY",
                    "taxHaven": false,
                    "expectedTaxRate": 25.00,
                    "statutoryTaxRate": 25.00,
                    "isEuMember": true,
                    "isOecdMember": true,
                    "blacklistStatus": "NONE"
                }
                """;

        mockMvc.perform(post("/api/countries")
                        .contentType(APPLICATION_JSON)
                        .content(newCountryJson))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("ACCESS_DENIED"))
                .andExpect(jsonPath("$.message").value("User not authenticated"));
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateCountry_withNullAuthentication_shouldThrowAccessDenied() throws Exception {
        CountryModel existingCountry = countryRepository.findAll().getFirst();

        String updatedCountryJson = """
                {
                    "countryCode": "DE",
                    "countryName": "Germany",
                    "region": "Europe",
                    "jurisdictionType": "COUNTRY",
                    "taxHaven": true,
                    "expectedTaxRate": 35.00,
                    "statutoryTaxRate": 34.50,
                    "isEuMember": true,
                    "isOecdMember": true,
                    "blacklistStatus": "EU_GREYLIST"
                }
                """;

        mockMvc.perform(put("/api/countries/" + existingCountry.getId())
                        .contentType(APPLICATION_JSON)
                        .content(updatedCountryJson))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("ACCESS_DENIED"))
                .andExpect(jsonPath("$.message").value("User not authenticated"));
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteCountry_withNullAuthentication_shouldThrowAccessDenied() throws Exception {
        CountryModel existingCountry = countryRepository.findAll().getFirst();

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete("/api/countries/" + existingCountry.getId()))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("ACCESS_DENIED"))
                .andExpect(jsonPath("$.message").value("User not authenticated"));
    }

}
