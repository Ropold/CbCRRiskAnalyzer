package de.ropold.backend.repository;

import de.ropold.backend.model.RiskAssessmentModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RiskAssessmentRepository extends JpaRepository<RiskAssessmentModel, UUID> {
}
