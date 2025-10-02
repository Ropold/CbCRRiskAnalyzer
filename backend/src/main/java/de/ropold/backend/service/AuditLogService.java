package de.ropold.backend.service;

import de.ropold.backend.dto.AuditLogResponse;
import de.ropold.backend.dto.UserBasicInfo;
import de.ropold.backend.exception.notfoundexceptions.AuditLogNotFoundException;
import de.ropold.backend.model.AuditLogModel;
import de.ropold.backend.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public List<AuditLogResponse> getAllAuditLogs() {
        return auditLogRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AuditLogResponse getAuditLogById(UUID id) {
        AuditLogModel auditLog = auditLogRepository.findById(id)
                .orElseThrow(() -> new AuditLogNotFoundException("Audit Log not found with id: " + id));
        return toDTO(auditLog);
    }

    public AuditLogModel addAuditLog(AuditLogModel auditLogModel) {
        return auditLogRepository.save(auditLogModel);
    }

    public AuditLogModel updateAuditLog(AuditLogModel auditLogModel) {
        return auditLogRepository.save(auditLogModel);
    }

    public void deleteAuditLog(UUID id) {
        auditLogRepository.findById(id)
                .orElseThrow(() -> new AuditLogNotFoundException("Audit Log not found with id: " + id));
        auditLogRepository.deleteById(id);
    }

    private AuditLogResponse toDTO(AuditLogModel model) {
        UserBasicInfo userInfo = null;
        if (model.getUser() != null) {
            userInfo = new UserBasicInfo(
                    model.getUser().getId(),
                    model.getUser().getUsername(),
                    model.getUser().getName()
            );
        }

        return new AuditLogResponse(
                model.getId(),
                model.getTableName(),
                model.getRecordId(),
                model.getAction(),
                model.getFieldName(),
                model.getOldValue(),
                model.getNewValue(),
                userInfo,
                model.getUsername(),
                model.getIpAddress(),
                model.getCreatedAt()
        );
    }
}
