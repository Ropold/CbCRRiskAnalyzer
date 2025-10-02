package de.ropold.backend.service;

import de.ropold.backend.dto.AuditLogResponse;
import de.ropold.backend.exception.notfoundexceptions.AuditLogNotFoundException;
import de.ropold.backend.model.AuditLogModel;
import de.ropold.backend.repository.AuditLogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

class AuditLogServiceTest {

    AuditLogRepository auditLogRepository = mock(AuditLogRepository.class);
    AuditLogService auditLogService = new AuditLogService(auditLogRepository);

    List<AuditLogModel> allAuditLogs;

    @BeforeEach
    void setUp() {
        AuditLogModel auditLogModel1 = new AuditLogModel(
                null,
                "risk_assessments",
                UUID.randomUUID(),
                "UPDATE",
                "overallRiskLevel",
                "LOW",
                "HIGH",
                null,
                "admin",
                "192.168.1.1",
                null
        );
        AuditLogModel auditLogModel2 = new AuditLogModel(
                null,
                "cbcr_reports",
                UUID.randomUUID(),
                "INSERT",
                null,
                null,
                null,
                null,
                "user",
                "192.168.1.2",
                null
        );

        allAuditLogs = List.of(auditLogModel1, auditLogModel2);
        when(auditLogRepository.findAll()).thenReturn(allAuditLogs);
    }

    @Test
    void testGetAllAuditLogs() {
        List<AuditLogResponse> result = auditLogService.getAllAuditLogs();

        assertEquals(2, result.size());
        assertEquals("risk_assessments", result.getFirst().tableName());
        assertEquals("cbcr_reports", result.get(1).tableName());
    }

    @Test
    void testGetAuditLogById_Success() {
        UUID testId = UUID.randomUUID();
        AuditLogModel auditLog = allAuditLogs.getFirst();
        auditLog.setId(testId);

        when(auditLogRepository.findById(testId)).thenReturn(Optional.of(auditLog));

        AuditLogResponse result = auditLogService.getAuditLogById(testId);

        assertNotNull(result);
        assertEquals("risk_assessments", result.tableName());
        assertEquals("UPDATE", result.action());
        verify(auditLogRepository, times(1)).findById(testId);
    }

    @Test
    void testGetAuditLogById_NotFound() {
        UUID testId = UUID.randomUUID();

        when(auditLogRepository.findById(testId)).thenReturn(Optional.empty());

        assertThrows(AuditLogNotFoundException.class, () -> auditLogService.getAuditLogById(testId));

        verify(auditLogRepository, times(1)).findById(testId);
    }

    @Test
    void testAddAuditLog() {
        AuditLogModel newAuditLog = allAuditLogs.getFirst();

        when(auditLogRepository.save(any(AuditLogModel.class))).thenReturn(newAuditLog);

        AuditLogModel result = auditLogService.addAuditLog(newAuditLog);

        assertNotNull(result);
        assertEquals("risk_assessments", result.getTableName());
        assertEquals("UPDATE", result.getAction());
        verify(auditLogRepository, times(1)).save(newAuditLog);
    }

    @Test
    void testUpdateAuditLog() {
        AuditLogModel updatedAuditLog = allAuditLogs.getFirst();
        updatedAuditLog.setAction("DELETE");

        when(auditLogRepository.save(any(AuditLogModel.class))).thenReturn(updatedAuditLog);

        AuditLogModel result = auditLogService.updateAuditLog(updatedAuditLog);

        assertNotNull(result);
        assertEquals("DELETE", result.getAction());
        verify(auditLogRepository, times(1)).save(updatedAuditLog);
    }

    @Test
    void testDeleteAuditLog_Success() {
        UUID testId = UUID.randomUUID();
        AuditLogModel auditLog = allAuditLogs.getFirst();

        when(auditLogRepository.findById(testId)).thenReturn(Optional.of(auditLog));
        doNothing().when(auditLogRepository).deleteById(testId);

        auditLogService.deleteAuditLog(testId);

        verify(auditLogRepository, times(1)).findById(testId);
        verify(auditLogRepository, times(1)).deleteById(testId);
    }

    @Test
    void testDeleteAuditLog_NotFound() {
        UUID testId = UUID.randomUUID();

        when(auditLogRepository.findById(testId)).thenReturn(Optional.empty());

        assertThrows(AuditLogNotFoundException.class, () -> auditLogService.deleteAuditLog(testId));

        verify(auditLogRepository, times(1)).findById(testId);
        verify(auditLogRepository, never()).deleteById(testId);
    }

    @Test
    void testGetAllAuditLogs_WithNullUser() {
        AuditLogModel auditLogWithNullUser = new AuditLogModel(
                UUID.randomUUID(),
                "companies",
                UUID.randomUUID(),
                "DELETE",
                null,
                null,
                null,
                null,
                "system",
                "127.0.0.1",
                null
        );

        when(auditLogRepository.findAll()).thenReturn(List.of(auditLogWithNullUser));

        List<AuditLogResponse> result = auditLogService.getAllAuditLogs();

        assertEquals(1, result.size());
        assertNull(result.getFirst().user());
        assertEquals("system", result.getFirst().username());
    }

    @Test
    void testGetAuditLogById_WithNullUser() {
        UUID testId = UUID.randomUUID();
        AuditLogModel auditLogWithNullUser = new AuditLogModel(
                testId,
                "companies",
                UUID.randomUUID(),
                "DELETE",
                null,
                null,
                null,
                null,
                "system",
                "127.0.0.1",
                null
        );

        when(auditLogRepository.findById(testId)).thenReturn(Optional.of(auditLogWithNullUser));

        AuditLogResponse result = auditLogService.getAuditLogById(testId);

        assertNotNull(result);
        assertNull(result.user());
        assertEquals("system", result.username());
        verify(auditLogRepository, times(1)).findById(testId);
    }

    @Test
    void testGetAllAuditLogs_WithUser() {
        de.ropold.backend.model.UserModel user = new de.ropold.backend.model.UserModel();
        user.setId(UUID.randomUUID());
        user.setUsername("testUser");
        user.setName("Test User");

        AuditLogModel auditLogWithUser = new AuditLogModel(
                UUID.randomUUID(),
                "companies",
                UUID.randomUUID(),
                "UPDATE",
                "name",
                "Old Name",
                "New Name",
                user,
                "testUser",
                "192.168.1.1",
                null
        );

        when(auditLogRepository.findAll()).thenReturn(List.of(auditLogWithUser));

        List<AuditLogResponse> result = auditLogService.getAllAuditLogs();

        assertEquals(1, result.size());
        assertNotNull(result.getFirst().user());
        assertEquals(user.getId(), result.getFirst().user().id());
        assertEquals("testUser", result.getFirst().user().username());
        assertEquals("Test User", result.getFirst().user().name());
    }

}
