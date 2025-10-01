package de.ropold.backend.controller;

import de.ropold.backend.exception.notfoundexceptions.AccessDeniedException;
import de.ropold.backend.model.CountryModel;
import de.ropold.backend.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    @GetMapping
    public List<CountryModel> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{id}")
    public CountryModel getCountryById(@PathVariable UUID id) {
        return countryService.getCountryById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CountryModel addCountry(
            @RequestBody CountryModel countryModel,
            @AuthenticationPrincipal OAuth2User authentication) {

        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }

        return countryService.addCountry(countryModel);
    }

    @PutMapping("/{id}")
    public CountryModel updateCountry(
            @PathVariable UUID id,
            @RequestBody CountryModel countryModel,
            @AuthenticationPrincipal OAuth2User authentication){

        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }

        countryService.getCountryById(id); // Validates that country exists
        countryModel.setId(id);
        return countryService.updateCountry(countryModel);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCountry(@PathVariable UUID id, @AuthenticationPrincipal OAuth2User authentication) {
        if (authentication == null) {
            throw new AccessDeniedException("User not authenticated");
        }
        countryService.deleteCountry(id);
    }
}
