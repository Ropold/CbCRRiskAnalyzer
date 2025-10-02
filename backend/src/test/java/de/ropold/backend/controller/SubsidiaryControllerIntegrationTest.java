package de.ropold.backend.controller;

import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.model.SubsidiaryModel;
import de.ropold.backend.repository.CompanyRepository;
import de.ropold.backend.repository.CountryRepository;
import de.ropold.backend.repository.SubsidiaryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SubsidiaryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SubsidiaryRepository subsidiaryRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CountryRepository countryRepository;

    @BeforeEach
    void setUp() {
        subsidiaryRepository.deleteAll();
        companyRepository.deleteAll();
        countryRepository.deleteAll();

        CountryModel country1 = new CountryModel(
                null,
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
        CountryModel country2 = new CountryModel(
                null,
                "US",
                "United States",
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
        countryRepository.saveAll(List.of(country1, country2));

        CompanyModel company = new CompanyModel(
                null,
                "Parent Company",
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
        companyRepository.save(company);

        SubsidiaryModel subsidiaryModel1 = new SubsidiaryModel(
                null,
                company,
                "Subsidiary Germany",
                country1,
                null,
                "DE123456789",
                SubsidiaryModel.EntityType.SUBSIDIARY,
                SubsidiaryModel.MainBusinessActivity.MANUFACTURING_OR_PRODUCTION,
                null,
                true,
                null,
                null
        );
        SubsidiaryModel subsidiaryModel2 = new SubsidiaryModel(
                null,
                company,
                "Subsidiary USA",
                country2,
                null,
                "US987654321",
                SubsidiaryModel.EntityType.BRANCH,
                SubsidiaryModel.MainBusinessActivity.SALES_MARKETING_OR_DISTRIBUTION,
                null,
                true,
                null,
                null
        );

        subsidiaryRepository.saveAll(List.of(subsidiaryModel1, subsidiaryModel2));
    }

    @Test
    void testGetAllSubsidiaries() throws Exception {
        mockMvc.perform(get("/api/subsidiaries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Subsidiary Germany"))
                .andExpect(jsonPath("$[1].name").value("Subsidiary USA"));
    }

    @Test
    void testGetSubsidiaryById_Success() throws Exception {
        List<SubsidiaryModel> subsidiaries = subsidiaryRepository.findAll();
        UUID testId = subsidiaries.get(0).getId();

        mockMvc.perform(get("/api/subsidiaries/{id}", testId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Subsidiary Germany"))
                .andExpect(jsonPath("$.taxIdentificationNumber").value("DE123456789"));
    }

    @Test
    void testGetSubsidiaryById_NotFound() throws Exception {
        UUID nonExistentId = UUID.randomUUID();

        mockMvc.perform(get("/api/subsidiaries/{id}", nonExistentId))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testAddSubsidiary_Success() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        CompanyModel company = companyRepository.findAll().get(0);
        CountryModel country = countryRepository.findAll().get(0);

        String newSubsidiaryJson = String.format("""
                {
                    "company": {"id": "%s"},
                    "name": "New Subsidiary",
                    "country": {"id": "%s"},
                    "taxIdentificationNumber": "FR123456789",
                    "entityType": "SUBSIDIARY",
                    "mainBusinessActivity": "SALES_MARKETING_OR_DISTRIBUTION",
                    "isActive": true
                }
                """, company.getId(), country.getId());

        mockMvc.perform(post("/api/subsidiaries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newSubsidiaryJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("New Subsidiary"))
                .andExpect(jsonPath("$.taxIdentificationNumber").value("FR123456789"));
    }

    @Test
    void testAddSubsidiary_Unauthorized() throws Exception {
        CompanyModel company = companyRepository.findAll().get(0);
        CountryModel country = countryRepository.findAll().get(0);

        String newSubsidiaryJson = String.format("""
                {
                    "company": {"id": "%s"},
                    "name": "New Subsidiary",
                    "country": {"id": "%s"}
                }
                """, company.getId(), country.getId());

        mockMvc.perform(post("/api/subsidiaries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newSubsidiaryJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateSubsidiary_Success() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        List<SubsidiaryModel> subsidiaries = subsidiaryRepository.findAll();
        UUID testId = subsidiaries.get(0).getId();
        CompanyModel company = companyRepository.findAll().get(0);
        CountryModel country = countryRepository.findAll().get(0);

        String updatedSubsidiaryJson = String.format("""
                {
                    "company": {"id": "%s"},
                    "name": "Updated Subsidiary",
                    "country": {"id": "%s"},
                    "taxIdentificationNumber": "DE999999999",
                    "entityType": "BRANCH",
                    "mainBusinessActivity": "HOLDING_SHARES_OR_OTHER_EQUITY_INSTRUMENTS",
                    "isActive": true
                }
                """, company.getId(), country.getId());

        mockMvc.perform(put("/api/subsidiaries/{id}", testId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedSubsidiaryJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Subsidiary"))
                .andExpect(jsonPath("$.taxIdentificationNumber").value("DE999999999"));
    }

    @Test
    void testUpdateSubsidiary_Unauthorized() throws Exception {
        List<SubsidiaryModel> subsidiaries = subsidiaryRepository.findAll();
        UUID testId = subsidiaries.get(0).getId();
        CompanyModel company = companyRepository.findAll().get(0);
        CountryModel country = countryRepository.findAll().get(0);

        String updatedSubsidiaryJson = String.format("""
                {
                    "company": {"id": "%s"},
                    "name": "Updated Subsidiary",
                    "country": {"id": "%s"}
                }
                """, company.getId(), country.getId());

        mockMvc.perform(put("/api/subsidiaries/{id}", testId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedSubsidiaryJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteSubsidiary_Success() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        List<SubsidiaryModel> subsidiaries = subsidiaryRepository.findAll();
        UUID testId = subsidiaries.get(0).getId();

        mockMvc.perform(delete("/api/subsidiaries/{id}", testId))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteSubsidiary_Unauthorized() throws Exception {
        List<SubsidiaryModel> subsidiaries = subsidiaryRepository.findAll();
        UUID testId = subsidiaries.get(0).getId();

        mockMvc.perform(delete("/api/subsidiaries/{id}", testId))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteSubsidiary_NotFound() throws Exception {
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

        mockMvc.perform(delete("/api/subsidiaries/{id}", nonExistentId))
                .andExpect(status().isNotFound());
    }

}
