package de.ropold.backend.service;

import de.ropold.backend.exception.notfoundexceptions.CountryNotFoundException;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CountryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CountryServiceTest {

    CountryRepository countryRepository = mock(CountryRepository.class);
    CountryService countryService = new CountryService(countryRepository);

    List<CountryModel> allCountries;

    @BeforeEach
    void setUp() {
        CountryModel countryModel1 = new CountryModel(
                java.util.UUID.randomUUID(),
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
                java.util.UUID.randomUUID(),
                "US",
                "United States",
                "North America",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("25.00"),
                new java.math.BigDecimal("24.90"),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );

        allCountries = List.of(countryModel1, countryModel2);
        when(countryRepository.findAll()).thenReturn(allCountries);
    }

    @Test
    void testGetAllCountries() {
        // Act
        List<CountryModel> result = countryService.getAllCountries();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Germany", result.getFirst().getCountryName());
        assertEquals("United States", result.get(1).getCountryName());
        verify(countryRepository, times(1)).findAll();
    }

    @Test
    void testGetCountryById_success() {
        // Arrange
        UUID testId = UUID.randomUUID();
        CountryModel testCountry = new CountryModel(
                testId,
                "FR",
                "France",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("25.00"),
                new java.math.BigDecimal("25.00"),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );
        when(countryRepository.findById(testId)).thenReturn(Optional.of(testCountry));

        // Act
        CountryModel result = countryService.getCountryById(testId);

        // Assert
        assertNotNull(result);
        assertEquals("France", result.getCountryName());
        assertEquals("FR", result.getCountryCode());
        verify(countryRepository, times(1)).findById(testId);
    }

    @Test
    void testGetCountryById_notFound() {
        // Arrange
        UUID testId = UUID.randomUUID();
        when(countryRepository.findById(testId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(CountryNotFoundException.class, () -> countryService.getCountryById(testId));
        verify(countryRepository, times(1)).findById(testId);
    }

    @Test
    void testAddCountry() {
        // Arrange
        CountryModel newCountry = new CountryModel(
                null,
                "IT",
                "Italy",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("24.00"),
                new java.math.BigDecimal("24.00"),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );
        CountryModel savedCountry = new CountryModel(
                UUID.randomUUID(),
                "IT",
                "Italy",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("24.00"),
                new java.math.BigDecimal("24.00"),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );
        when(countryRepository.save(newCountry)).thenReturn(savedCountry);

        // Act
        CountryModel result = countryService.addCountry(newCountry);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals("Italy", result.getCountryName());
        verify(countryRepository, times(1)).save(newCountry);
    }

    @Test
    void testUpdateCountry() {
        // Arrange
        UUID testId = UUID.randomUUID();
        CountryModel updatedCountry = new CountryModel(
                testId,
                "DE",
                "Germany",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                true,
                new java.math.BigDecimal("35.00"),
                new java.math.BigDecimal("35.00"),
                true,
                true,
                CountryModel.BlacklistStatus.EU_GREYLIST,
                null
        );
        when(countryRepository.save(updatedCountry)).thenReturn(updatedCountry);

        // Act
        CountryModel result = countryService.updateCountry(updatedCountry);

        // Assert
        assertNotNull(result);
        assertTrue(result.getTaxHaven());
        assertEquals(CountryModel.BlacklistStatus.EU_GREYLIST, result.getBlacklistStatus());
        verify(countryRepository, times(1)).save(updatedCountry);
    }

    @Test
    void testDeleteCountry_success() {
        // Arrange
        UUID testId = UUID.randomUUID();
        CountryModel testCountry = new CountryModel(
                testId,
                "FR",
                "France",
                "Europe",
                CountryModel.JurisdictionType.COUNTRY,
                false,
                new java.math.BigDecimal("25.00"),
                new java.math.BigDecimal("25.00"),
                true,
                true,
                CountryModel.BlacklistStatus.NONE,
                null
        );
        when(countryRepository.findById(testId)).thenReturn(Optional.of(testCountry));

        // Act
        countryService.deleteCountry(testId);

        // Assert
        verify(countryRepository, times(1)).findById(testId);
        verify(countryRepository, times(1)).deleteById(testId);
    }

    @Test
    void testDeleteCountry_notFound() {
        // Arrange
        UUID testId = UUID.randomUUID();
        when(countryRepository.findById(testId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(CountryNotFoundException.class, () -> countryService.deleteCountry(testId));
        verify(countryRepository, times(1)).findById(testId);
        verify(countryRepository, never()).deleteById(testId);
    }

}
