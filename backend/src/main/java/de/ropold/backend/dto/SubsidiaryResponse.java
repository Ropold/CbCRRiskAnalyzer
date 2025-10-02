package de.ropold.backend.dto;

import de.ropold.backend.model.SubsidiaryModel;

import java.time.LocalDateTime;
import java.util.UUID;

public record SubsidiaryResponse(
        UUID id,
        CompanyBasicInfo company,
        String name,
        CountryBasicInfo country,
        String leiCode,
        String taxIdentificationNumber,
        SubsidiaryModel.EntityType entityType,
        SubsidiaryModel.MainBusinessActivity mainBusinessActivity,
        String additionalActivities,
        Boolean isActive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}