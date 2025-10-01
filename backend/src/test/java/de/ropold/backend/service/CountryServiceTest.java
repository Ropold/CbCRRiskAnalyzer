package de.ropold.backend.service;

import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CountryRepository;
import org.junit.jupiter.api.BeforeEach;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CountryServiceTest {

    CountryRepository countryRepository = mock(CountryRepository.class);
    CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    ImageUploadUtil imageUploadUtil = mock(ImageUploadUtil.class);
    CountryService countryService = new CountryService(cloudinaryService, countryRepository, imageUploadUtil);

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

}
