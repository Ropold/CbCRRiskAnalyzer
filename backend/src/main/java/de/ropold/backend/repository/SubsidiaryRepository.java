package de.ropold.backend.repository;

import de.ropold.backend.model.SubsidiaryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubsidiaryRepository extends JpaRepository<SubsidiaryModel, UUID> {
}
