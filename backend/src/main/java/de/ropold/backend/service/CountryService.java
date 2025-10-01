package de.ropold.backend.service;

import de.ropold.backend.exception.notfoundexceptions.CountryNotFoundException;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CloudinaryService cloudinaryService;
    private final CountryRepository countryRepository;
    private final ImageUploadUtil imageUploadUtil;

    public List<CountryModel> getAllCountries() {
        return countryRepository.findAll();
    }

    public CountryModel getCountryById(UUID id) {
        return countryRepository.findById(id)
                .orElseThrow(() -> new CountryNotFoundException("Country not found with id: " + id));
    }

    public CountryModel addCountry(CountryModel countryModel) {
        return countryRepository.save(countryModel);
    }

    public CountryModel updateCountry(CountryModel countryModel) {
        return countryRepository.save(countryModel);
    }

    public void deleteCountry(UUID id) {
        countryRepository.findById(id)
                .orElseThrow(() -> new CountryNotFoundException("Country not found with id: " + id));
        countryRepository.deleteById(id);
    }

}
