package de.ropold.backend.repository;

import de.ropold.backend.model.CountryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CountryRepository extends  JpaRepository<CountryModel, UUID> {
}

