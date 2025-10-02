package de.ropold.backend.service;

import de.ropold.backend.exception.notfoundexceptions.SubsidiaryNotFoundException;
import de.ropold.backend.model.SubsidiaryModel;
import de.ropold.backend.repository.SubsidiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubsidiaryService {

    private final SubsidiaryRepository subsidiaryRepository;

    public List<SubsidiaryModel> getAllSubsidiaries() {
        return subsidiaryRepository.findAll();
    }

    public SubsidiaryModel getSubsidiaryById(UUID id) {
        return subsidiaryRepository.findById(id)
                .orElseThrow(() -> new SubsidiaryNotFoundException("Subsidiary not found with id: " + id));
    }

    public SubsidiaryModel addSubsidiary(SubsidiaryModel subsidiaryModel) {
        return subsidiaryRepository.save(subsidiaryModel);
    }

    public SubsidiaryModel updateSubsidiary(SubsidiaryModel subsidiaryModel) {
        return subsidiaryRepository.save(subsidiaryModel);
    }

    public void deleteSubsidiary(UUID id) {
        subsidiaryRepository.findById(id)
                .orElseThrow(() -> new SubsidiaryNotFoundException("Subsidiary not found with id: " + id));
        subsidiaryRepository.deleteById(id);
    }
}
