package de.ropold.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record AuditLogResponse(
        UUID id,
        String tableName,
        UUID recordId,
        String action,
        String fieldName,
        String oldValue,
        String newValue,
        UserBasicInfo user,
        String username,
        String ipAddress,
        LocalDateTime createdAt
) {
}