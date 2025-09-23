package de.ropold.backend.controller;

import de.ropold.backend.model.CountryModel;
import de.ropold.backend.service.CloudinaryService;
import de.ropold.backend.service.CountryService;
import de.ropold.backend.service.ImageUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;
    private final CloudinaryService cloudinaryService;
    private final ImageUploadUtil imageUploadUtil;

    @GetMapping
    public List<CountryModel> getAllCountries() {
        return countryService.getAllCountries();
    }
}
