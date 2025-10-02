package de.ropold.backend.dto;

import java.util.UUID;

public record UserBasicInfo(
        UUID id,
        String username,
        String name
) {
}