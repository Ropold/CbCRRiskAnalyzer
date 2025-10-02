package de.ropold.backend.repository;

import de.ropold.backend.model.CbcrReportModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CbcrReportRepository extends JpaRepository<CbcrReportModel, UUID> {
}
