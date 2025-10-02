package de.ropold.backend.dto;

import java.util.UUID;

public record CountryBasicInfo(
        UUID id,
        String countryCode,
        String countryName
) {
}