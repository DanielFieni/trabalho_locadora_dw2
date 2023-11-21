package com.locadora.service;

import com.locadora.domain.Dependent;
import com.locadora.dto.DependentDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.DependentMapper;
import com.locadora.repository.DependentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DependentService {

    private final DependentRepository dependentRepository;
    private final DependentMapper dependentMapper;

    public DependentDTO insertDependent(DependentDTO dto) {
        checkFields(dto);
        Dependent dependent = dependentMapper.toEntity(dto);
        dependent.setActive(true);
        return dependentMapper.toDTO(dependentRepository.save(dependent));
    }

    public List<DependentDTO> getAllDependents() {
        return dependentMapper.toDTO(dependentRepository.findAll());
    }

    public void deleteDependent(int numInscription) {
        Dependent dependent = findByDependent(numInscription);
        dependentRepository.delete(dependent);
    }

    public DependentDTO updateDependent(DependentDTO dto, int numInscription) {
        checkFields(dto);
        findByDependent(numInscription);
        Dependent dependent = dependentMapper.toEntity(dto);
        return dependentMapper.toDTO(dependentRepository.save(dependent));
    }

    public DependentDTO getDependent(int numInscription) {
        return dependentMapper.toDTO(findByDependent(numInscription));
    }

    private Dependent findByDependent(int numInscription) {
        return dependentRepository.findDependentByNumInscription(numInscription)
                .orElseThrow(() -> new RegraNegocioException("Dependente não encontrado"));
    }

    private void checkFields(DependentDTO dto) {
        checkFieldIsEmptyOrBlank(dto.name(), "Nome");
    }

    private boolean checkFieldIsEmptyOrBlank(String field, String msg){
        if(field.isBlank() || field.isEmpty()) {
            throw new RegraNegocioException(msg + " inválido!");
        }
        return true;
    }

}
