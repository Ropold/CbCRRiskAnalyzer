package de.ropold.backend.service;

import de.ropold.backend.model.CountryModel;
import de.ropold.backend.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CloudinaryService cloudinaryService;
    private final CountryRepository countryRepository;
    private final ImageUploadUtil imageUploadUtil;

    public List<CountryModel> getAllCountries() {
        return countryRepository.findAll();
    }
}
