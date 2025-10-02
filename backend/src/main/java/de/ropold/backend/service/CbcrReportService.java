package de.ropold.backend.service;

import de.ropold.backend.repository.CbcrReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CbcrReportService {

    private final CbcrReportRepository cbcrReportRepository;
}
