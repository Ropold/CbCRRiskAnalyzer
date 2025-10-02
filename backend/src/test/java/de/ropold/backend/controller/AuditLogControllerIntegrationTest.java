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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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


}
