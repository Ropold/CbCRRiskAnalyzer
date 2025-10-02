package de.ropold.backend.controller;

import de.ropold.backend.model.AuditLogModel;
import de.ropold.backend.repository.AuditLogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;

import org.springframework.http.MediaType;

@SpringBootTest
@AutoConfigureMockMvc
class AuditLogControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @BeforeEach
    void setUp() {
        auditLogRepository.deleteAll();

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
        auditLogRepository.saveAll(List.of(auditLogModel1, auditLogModel2));
    }

    @Test
    void testGetAllAuditLogs() throws Exception {
        mockMvc.perform(get("/api/audit-logs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].tableName").value("risk_assessments"))
                .andExpect(jsonPath("$[1].tableName").value("cbcr_reports"));
    }

    @Test
    void testGetAuditLogById_Success() throws Exception {
        List<AuditLogModel> logs = auditLogRepository.findAll();
        UUID testId = logs.getFirst().getId();

        mockMvc.perform(get("/api/audit-logs/{id}", testId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tableName").value("risk_assessments"))
                .andExpect(jsonPath("$.action").value("UPDATE"));
    }

    @Test
    void testGetAuditLogById_NotFound() throws Exception {
        UUID nonExistentId = UUID.randomUUID();

        mockMvc.perform(get("/api/audit-logs/{id}", nonExistentId))
                .andExpect(status().isNotFound());
    }

    @Test
    void testAddAuditLog_Success() throws Exception {
        String newAuditLogJson = """
                {
                    "tableName": "companies",
                    "recordId": "123e4567-e89b-12d3-a456-426614174000",
                    "action": "DELETE",
                    "fieldName": "name",
                    "oldValue": "Old Company",
                    "newValue": null,
                    "username": "testuser",
                    "ipAddress": "10.0.0.1"
                }
                """;

        mockMvc.perform(post("/api/audit-logs")
                        .with(oauth2Login())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newAuditLogJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.tableName").value("companies"))
                .andExpect(jsonPath("$.action").value("DELETE"));
    }

    @Test
    void testAddAuditLog_Unauthorized() throws Exception {
        String newAuditLogJson = """
                {
                    "tableName": "companies",
                    "recordId": "123e4567-e89b-12d3-a456-426614174000",
                    "action": "DELETE"
                }
                """;

        mockMvc.perform(post("/api/audit-logs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newAuditLogJson))
                .andExpect(status().isForbidden());
    }

    @Test
    void testUpdateAuditLog_Success() throws Exception {
        List<AuditLogModel> logs = auditLogRepository.findAll();
        UUID testId = logs.getFirst().getId();

        String updatedAuditLogJson = """
                {
                    "tableName": "risk_assessments",
                    "recordId": "123e4567-e89b-12d3-a456-426614174000",
                    "action": "UPDATE",
                    "fieldName": "riskLevel",
                    "oldValue": "MEDIUM",
                    "newValue": "CRITICAL",
                    "username": "admin",
                    "ipAddress": "192.168.1.1"
                }
                """;

        mockMvc.perform(put("/api/audit-logs/{id}", testId)
                        .with(oauth2Login())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedAuditLogJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fieldName").value("riskLevel"))
                .andExpect(jsonPath("$.newValue").value("CRITICAL"));
    }

    @Test
    void testUpdateAuditLog_Unauthorized() throws Exception {
        List<AuditLogModel> logs = auditLogRepository.findAll();
        UUID testId = logs.getFirst().getId();

        String updatedAuditLogJson = """
                {
                    "tableName": "risk_assessments",
                    "action": "UPDATE"
                }
                """;

        mockMvc.perform(put("/api/audit-logs/{id}", testId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedAuditLogJson))
                .andExpect(status().isForbidden());
    }

    @Test
    void testDeleteAuditLog_Success() throws Exception {
        List<AuditLogModel> logs = auditLogRepository.findAll();
        UUID testId = logs.getFirst().getId();

        mockMvc.perform(delete("/api/audit-logs/{id}", testId)
                        .with(oauth2Login()))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteAuditLog_Unauthorized() throws Exception {
        List<AuditLogModel> logs = auditLogRepository.findAll();
        UUID testId = logs.getFirst().getId();

        mockMvc.perform(delete("/api/audit-logs/{id}", testId))
                .andExpect(status().isForbidden());
    }

    @Test
    void testDeleteAuditLog_NotFound() throws Exception {
        UUID nonExistentId = UUID.randomUUID();

        mockMvc.perform(delete("/api/audit-logs/{id}", nonExistentId)
                        .with(oauth2Login()))
                .andExpect(status().isNotFound());
    }

}
