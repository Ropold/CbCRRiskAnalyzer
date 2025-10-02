package de.ropold.backend.dto;

import java.util.UUID;

public record CompanyBasicInfo(
        UUID id,
        String name,
        String industry,
        String reportingCurrency
) {
}