package de.ropold.backend.service;

import de.ropold.backend.repository.SubsidiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubsidiaryService {

    private final SubsidiaryRepository subsidiaryRepository;

}
