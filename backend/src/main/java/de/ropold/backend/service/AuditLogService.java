package de.ropold.backend.service;

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

    public List<AuditLogModel> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    public AuditLogModel getAuditLogById(UUID id) {
        return auditLogRepository.findById(id)
                .orElseThrow(() -> new AuditLogNotFoundException("Audit Log not found with id: " + id));
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
}
