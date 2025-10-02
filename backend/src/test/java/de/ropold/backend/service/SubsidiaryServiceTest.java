package de.ropold.backend.service;

import de.ropold.backend.dto.SubsidiaryResponse;
import de.ropold.backend.exception.notfoundexceptions.SubsidiaryNotFoundException;
import de.ropold.backend.model.CompanyModel;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.model.SubsidiaryModel;
import de.ropold.backend.repository.SubsidiaryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

class SubsidiaryServiceTest {

    SubsidiaryRepository subsidiaryRepository = mock(SubsidiaryRepository.class);
    SubsidiaryService subsidiaryService = new SubsidiaryService(subsidiaryRepository);

    List<SubsidiaryModel> allSubsidiaries;

    @BeforeEach
    void setUp() {
        CountryModel country1 = new CountryModel(
                UUID.randomUUID(),
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
                UUID.randomUUID(),
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

        CompanyModel company = new CompanyModel(
                UUID.randomUUID(),
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

        allSubsidiaries = List.of(subsidiaryModel1, subsidiaryModel2);
        when(subsidiaryRepository.findAll()).thenReturn(allSubsidiaries);
    }

    @Test
    void testGetAllSubsidiaries() {
        List<SubsidiaryResponse> subsidiaries = subsidiaryService.getAllSubsidiaries();
        assertEquals(2, subsidiaries.size());
        assertEquals("Subsidiary Germany", subsidiaries.get(0).name());
        assertEquals("Subsidiary USA", subsidiaries.get(1).name());
    }

    @Test
    void testGetSubsidiaryById_Success() {
        UUID testId = UUID.randomUUID();
        SubsidiaryModel subsidiary = allSubsidiaries.get(0);
        subsidiary.setId(testId);

        when(subsidiaryRepository.findById(testId)).thenReturn(Optional.of(subsidiary));

        SubsidiaryResponse result = subsidiaryService.getSubsidiaryById(testId);

        assertNotNull(result);
        assertEquals("Subsidiary Germany", result.name());
        assertEquals("DE123456789", result.taxIdentificationNumber());
        verify(subsidiaryRepository, times(1)).findById(testId);
    }

    @Test
    void testGetSubsidiaryById_NotFound() {
        UUID testId = UUID.randomUUID();

        when(subsidiaryRepository.findById(testId)).thenReturn(Optional.empty());

        assertThrows(SubsidiaryNotFoundException.class, () -> {
            subsidiaryService.getSubsidiaryById(testId);
        });

        verify(subsidiaryRepository, times(1)).findById(testId);
    }

    @Test
    void testAddSubsidiary() {
        SubsidiaryModel newSubsidiary = allSubsidiaries.get(0);

        when(subsidiaryRepository.save(any(SubsidiaryModel.class))).thenReturn(newSubsidiary);

        SubsidiaryModel result = subsidiaryService.addSubsidiary(newSubsidiary);

        assertNotNull(result);
        assertEquals("Subsidiary Germany", result.getName());
        assertEquals("DE123456789", result.getTaxIdentificationNumber());
        verify(subsidiaryRepository, times(1)).save(newSubsidiary);
    }

    @Test
    void testUpdateSubsidiary() {
        SubsidiaryModel updatedSubsidiary = allSubsidiaries.get(0);
        updatedSubsidiary.setName("Updated Subsidiary");

        when(subsidiaryRepository.save(any(SubsidiaryModel.class))).thenReturn(updatedSubsidiary);

        SubsidiaryModel result = subsidiaryService.updateSubsidiary(updatedSubsidiary);

        assertNotNull(result);
        assertEquals("Updated Subsidiary", result.getName());
        verify(subsidiaryRepository, times(1)).save(updatedSubsidiary);
    }

    @Test
    void testDeleteSubsidiary_Success() {
        UUID testId = UUID.randomUUID();
        SubsidiaryModel subsidiary = allSubsidiaries.get(0);

        when(subsidiaryRepository.findById(testId)).thenReturn(Optional.of(subsidiary));
        doNothing().when(subsidiaryRepository).deleteById(testId);

        subsidiaryService.deleteSubsidiary(testId);

        verify(subsidiaryRepository, times(1)).findById(testId);
        verify(subsidiaryRepository, times(1)).deleteById(testId);
    }

    @Test
    void testDeleteSubsidiary_NotFound() {
        UUID testId = UUID.randomUUID();

        when(subsidiaryRepository.findById(testId)).thenReturn(Optional.empty());

        assertThrows(SubsidiaryNotFoundException.class, () -> {
            subsidiaryService.deleteSubsidiary(testId);
        });

        verify(subsidiaryRepository, times(1)).findById(testId);
        verify(subsidiaryRepository, never()).deleteById(testId);
    }

}
