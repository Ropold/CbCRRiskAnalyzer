package de.ropold.backend.controller;

import de.ropold.backend.dto.AuditLogResponse;
import de.ropold.backend.exception.notfoundexceptions.AccessDeniedException;
import de.ropold.backend.model.AuditLogModel;
import de.ropold.backend.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping
    public List<AuditLogResponse> getAllAuditLogs() {
        return auditLogService.getAllAuditLogs();
    }

    @GetMapping("/{id}")
    public AuditLogResponse getAuditLogById(@PathVariable UUID id) {
        return auditLogService.getAuditLogById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AuditLogResponse addAuditLog(
            @RequestBody AuditLogModel auditLogModel,
            @AuthenticationPrincipal OAuth2User authentication) {
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        AuditLogModel saved = auditLogService.addAuditLog(auditLogModel);
        return auditLogService.getAuditLogById(saved.getId());
    }

    @PutMapping("/{id}")
    public AuditLogResponse updateAuditLog(
            @PathVariable UUID id,
            @RequestBody AuditLogModel auditLogModel,
            @AuthenticationPrincipal OAuth2User authentication){
        if(authentication == null){
            throw new AccessDeniedException("User not authenticated");
        }
        auditLogService.getAuditLogById(id);
        auditLogModel.setId(id);
        AuditLogModel updated = auditLogService.updateAuditLog(auditLogModel);
        return auditLogService.getAuditLogById(updated.getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAuditLog(@PathVariable UUID id, @AuthenticationPrincipal OAuth2User authentication) {
        if (authentication == null) {
            throw new AccessDeniedException("User not authenticated");
        }
        auditLogService.deleteAuditLog(id);
    }
}
