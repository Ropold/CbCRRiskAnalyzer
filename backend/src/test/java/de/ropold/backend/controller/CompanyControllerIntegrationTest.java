package de.ropold.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.repository.CompanyRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CompanyControllerIntegrationTest {

    @MockitoBean
    private Cloudinary cloudinary;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CompanyRepository companyRepository;

    @BeforeEach
    void setUp() {
        companyRepository.deleteAll();

        CompanyModel companyModel = new CompanyModel(
                null,
                "Company One",
                "Technology",
                null,
                "EUR",
                "DE123456789",
                "529900T8BM49AURSDO55",
                null,
                true,
                "Full",
                new BigDecimal("750000000"),
                "http://example.com/company1.jpg",
                null,
                null
        );

        CompanyModel companyModel2 = new CompanyModel(
                null,
                "Company Two",
                "Finance",
                null,
                "USD",
                "US987654321",
                "XYZABC1234567890WXYZ",
                null,
                false,
                "Partial",
                new BigDecimal("500000000"),
                "http://example.com/company2.jpg",
                null,
                null
        );

        companyRepository.saveAll(List.of(companyModel, companyModel2));
    }

    @Test
    void testGetAllCompanies_shouldReturnAllCompanies() throws Exception {
      mockMvc.perform(get("/api/companies"))
              .andExpect(status().isOk())
              .andExpect(jsonPath("$.length()").value(2))
              .andExpect(jsonPath("$[0].name").value("Company One"))
              .andExpect(jsonPath("$[1].name").value("Company Two"));
    }

    @Test
    void testGetCompanyById_shouldReturnCompany() throws Exception {
        CompanyModel company = companyRepository.findAll().getFirst();
        mockMvc.perform(get("/api/companies/" + company.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Company One"))
                .andExpect(jsonPath("$.industry").value("Technology"));
    }

    @Test
    void testGetCompanyById_shouldReturnNotFound() throws Exception {
        mockMvc.perform(get("/api/companies/" + "00000000-0000-0000-0000-000000000000"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testAddCompany_shouldCreateCompany() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        Uploader mockUploader = mock(Uploader.class);
        when(mockUploader.upload(any(), anyMap())).thenReturn(Map.of("secure_url", "https://www.test.de/"));
        when(cloudinary.uploader()).thenReturn(mockUploader);

        companyRepository.deleteAll();

        mockMvc.perform(multipart("/api/companies")
                        .file(new MockMultipartFile("image", "image.jpg", "image/jpeg", "image".getBytes()))
                        .file(new MockMultipartFile("customerModel", "", "application/json", """
              {
                "name": "Test Company GmbH",
                "industry": "Technology",
                "reportingCurrency": "EUR",
                "taxIdentificationNumber": "DE999888777",
                "isUltimateParent": true,
                "consolidationScope": "Full",
                "cbcrReportingThreshold": 750000000
              }
              """.getBytes())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Company GmbH"))
                .andExpect(jsonPath("$.industry").value("Technology"));

        List<CompanyModel> allCompanies = companyRepository.findAll();
        Assertions.assertEquals(1, allCompanies.size());
    }

    @Test
    void testAddCompany_Unauthenticated_ShouldReturnForbidden() throws Exception {
        mockMvc.perform(multipart("/api/companies")
                        .file(new MockMultipartFile("image", "image.jpg", "image/jpeg", "image".getBytes()))
                        .file(new MockMultipartFile("customerModel", "", "application/json", """
              {
                "name": "Test Company GmbH",
                "industry": "Technology",
                "reportingCurrency": "EUR",
                "taxIdentificationNumber": "DE999888777",
                "isUltimateParent": true,
                "consolidationScope": "Full",
                "cbcrReportingThreshold": 750000000
              }
              """.getBytes())))
                .andExpect(status().isForbidden());

        List<CompanyModel> allCompanies = companyRepository.findAll();
        Assertions.assertEquals(2, allCompanies.size());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testUpdateCompanyWithPut() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        Uploader mockUploader = mock(Uploader.class);
        when(mockUploader.upload(any(), anyMap())).thenReturn(Map.of("secure_url", "https://example.com/updated-image.jpg"));
        when(cloudinary.uploader()).thenReturn(mockUploader);

        CompanyModel company = companyRepository.findAll().getFirst();

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/companies/" + company.getId())
                        .file(new MockMultipartFile("image", "image.jpg", "image/jpeg", "image".getBytes()))
                        .file(new MockMultipartFile("companyModel", "", "application/json", """
                        {
                          "id": "%s",
                          "name": "Company One Updated",
                          "industry": "Finance Updated",
                          "reportingCurrency": "USD",
                          "taxIdentificationNumber": "US123456789",
                          "isUltimateParent": false,
                          "consolidationScope": "Partial",
                          "cbcrReportingThreshold": 900000000,
                          "imageUrl": "https://example.com/updated-image.jpg"
                        }
                    """.formatted(company.getId()).getBytes()))
                        .contentType("multipart/form-data")
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Company One Updated"))
                .andExpect(jsonPath("$.industry").value("Finance Updated"))
                .andExpect(jsonPath("$.reportingCurrency").value("USD"))
                .andExpect(jsonPath("$.imageUrl").value("https://example.com/updated-image.jpg"));

        CompanyModel updated = companyRepository.findById(company.getId()).orElseThrow();
        Assertions.assertEquals("Company One Updated", updated.getName());
        Assertions.assertEquals("Finance Updated", updated.getIndustry());
        Assertions.assertEquals("USD", updated.getReportingCurrency());
        Assertions.assertEquals("https://example.com/updated-image.jpg", updated.getImageUrl());
    }

    @Test
    @WithMockUser(username = "test-user", authorities = {"OIDC_USER"})
    void testDeleteCompany_shouldReturnNoContent() throws Exception {
        OAuth2User mockOAuth2User = mock(OAuth2User.class);
        when(mockOAuth2User.getName()).thenReturn("test-user");
        when(mockOAuth2User.getAttribute("id")).thenReturn("github-id-123");

        OAuth2AuthenticationToken authToken = new OAuth2AuthenticationToken(
                mockOAuth2User,
                List.of(new SimpleGrantedAuthority("OIDC_USER")),
                "github"
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        Uploader mockUploader = mock(Uploader.class);
        when(mockUploader.upload(any(), anyMap())).thenReturn(Map.of("secure_url", "https://example.com/updated-image.jpg"));
        when(cloudinary.uploader()).thenReturn(mockUploader);

        CompanyModel company = companyRepository.findAll().getFirst();

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/companies/" + company.getId()))
                .andExpect(status().isNoContent());

        Assertions.assertFalse(companyRepository.existsById(company.getId()));
    }

    @Test
    void testDeleteCompany_Unauthenticated_ShouldReturnForbidden() throws Exception {
        CompanyModel company = companyRepository.findAll().getFirst();

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/companies/" + company.getId()))
                .andExpect(status().isForbidden());

        Assertions.assertTrue(companyRepository.existsById(company.getId()));
    }

    @Test
    void testUpdateCompany_Unauthenticated_ShouldReturnForbidden() throws Exception {
        CompanyModel company = companyRepository.findAll().getFirst();

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/companies/" + company.getId())
                        .file(new MockMultipartFile("companyModel", "", "application/json", """
                        {
                          "name": "Updated Company"
                        }
                    """.getBytes()))
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        }))
                .andExpect(status().isForbidden());
    }
}
