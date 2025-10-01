package de.ropold.backend.service;

import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CompanyServiceTest {

    CompanyRepository companyRepository = mock(CompanyRepository.class);
    CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    ImageUploadUtil imageUploadUtil = mock(ImageUploadUtil.class);
    CompanyService companyService = new CompanyService(companyRepository, cloudinaryService, imageUploadUtil);

    List<CompanyModel> allCompanies;

    @BeforeEach
    void setUp() {

        CompanyModel companyModel1 = new CompanyModel(
                java.util.UUID.randomUUID(),
                "Company One",
                "Technology",
                null,
                "EUR",
                "DE123456789",
                "529900T8BM49AURSDO55",
                null,
                true,
                "Full",
                java.math.BigDecimal.valueOf(750000000),
                "http://example.com/company1.jpg",
                null,
                null
        );

        CompanyModel companyModel2 = new CompanyModel(
                java.util.UUID.randomUUID(),
                "Company Two",
                "Finance",
                null,
                "USD",
                "US987654321",
                "XYZABC1234567890WXYZ",
                null,
                false,
                "Partial",
                java.math.BigDecimal.valueOf(500000000),
                "http://example.com/company2.jpg",
                null,
                null
        );

        allCompanies = List.of(companyModel1, companyModel2);
        when(companyRepository.findAll()).thenReturn(allCompanies);
    }

    @Test
    void getAllCompanies() {
        List<CompanyModel> companies = companyService.getAllCompanies();
        assertEquals(companies, allCompanies);
    }

    @Test
    void testGetCompanyById(){
        CompanyModel companyModel = allCompanies.getFirst();
        when(companyRepository.findById(companyModel.getId())).thenReturn(java.util.Optional.of(companyModel));
        CompanyModel result = companyService.getCompanyById(companyModel.getId());
        assertEquals(companyModel, result);
    }

    @Test
    void testAddCompany(){
        CompanyModel newCompany = new CompanyModel(
                null,
                "New Company",
                "Healthcare",
                null,
                "GBP",
                "GB123456789",
                "NEWCOMPANYLEICODE12345",
                null,
                false,
                "None",
                java.math.BigDecimal.valueOf(100000000),
                null,
                null,
                null
        );

        CompanyModel savedCompany = new CompanyModel(
                java.util.UUID.randomUUID(),
                newCompany.getName(),
                newCompany.getIndustry(),
                newCompany.getHeadquartersCountry(),
                newCompany.getReportingCurrency(),
                newCompany.getTaxIdentificationNumber(),
                newCompany.getLeiCode(),
                newCompany.getParentCompany(),
                newCompany.getIsUltimateParent(),
                newCompany.getConsolidationScope(),
                newCompany.getCbcrReportingThreshold(),
                newCompany.getImageUrl(),
                null,
                null
        );

        when(companyRepository.save(newCompany)).thenReturn(savedCompany);
        CompanyModel result = companyService.addCompany(newCompany);
        assertEquals(savedCompany, result);
    }

    @Test
    void testUpdateCompany(){
        CompanyModel existingCompany = allCompanies.getFirst();
        CompanyModel updatedCompany = new CompanyModel(
                existingCompany.getId(),
                "Updated Company Name",
                existingCompany.getIndustry(),
                existingCompany.getHeadquartersCountry(),
                existingCompany.getReportingCurrency(),
                existingCompany.getTaxIdentificationNumber(),
                existingCompany.getLeiCode(),
                existingCompany.getParentCompany(),
                existingCompany.getIsUltimateParent(),
                existingCompany.getConsolidationScope(),
                existingCompany.getCbcrReportingThreshold(),
                existingCompany.getImageUrl(),
                null,
                null
        );

        when(companyRepository.findById(existingCompany.getId())).thenReturn(java.util.Optional.of(existingCompany));
        when(companyRepository.save(updatedCompany)).thenReturn(updatedCompany);

        CompanyModel result = companyService.addCompany(updatedCompany);
        assertEquals(updatedCompany, result);
    }

    @Test
    void testDeleteCompany(){
        CompanyModel companyToDelete = allCompanies.getFirst();
        when(companyRepository.findById(companyToDelete.getId())).thenReturn(java.util.Optional.of(companyToDelete));
        companyService.deleteCompany(companyToDelete.getId());
        verify(companyRepository, times(1)).deleteById(companyToDelete.getId());
        verify(cloudinaryService, times(1)).deleteImage(companyToDelete.getImageUrl());
    }
}
