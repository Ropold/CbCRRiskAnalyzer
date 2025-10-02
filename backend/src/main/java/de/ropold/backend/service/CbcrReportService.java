package de.ropold.backend.service;

import de.ropold.backend.exception.notfoundexceptions.CbcrNotFoundException;
import de.ropold.backend.model.CbcrReportModel;
import de.ropold.backend.repository.CbcrReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CbcrReportService {

    private final CbcrReportRepository cbcrReportRepository;

    public List<CbcrReportModel> getAllCbcrReports() {
        return cbcrReportRepository.findAll();
    }

    public CbcrReportModel getCbcrReportById(UUID id) {
        return cbcrReportRepository.findById(id)
                .orElseThrow(()-> new CbcrNotFoundException("Cbcr Report not found with id: " + id));
    }

    public CbcrReportModel addCbcrReport(CbcrReportModel cbcrReportModel) {
        return cbcrReportRepository.save(cbcrReportModel);
    }

    public CbcrReportModel updateCbcrReport(CbcrReportModel cbcrReportModel) {
        return cbcrReportRepository.save(cbcrReportModel);
    }

    public void deleteCbcrReport(UUID id) {
        cbcrReportRepository.findById(id)
                .orElseThrow(()-> new CbcrNotFoundException("Cbcr Report not found with id: " + id));
        cbcrReportRepository.deleteById(id);
    }

}
