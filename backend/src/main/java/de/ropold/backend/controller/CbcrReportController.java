package de.ropold.backend.controller;

import de.ropold.backend.service.CbcrReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cbcr-reports")
@RequiredArgsConstructor
public class CbcrReportController {

    private final CbcrReportService cbcrReportService;

}
