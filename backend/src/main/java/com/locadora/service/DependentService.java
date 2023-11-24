package com.locadora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.locadora.domain.Associate;
import com.locadora.domain.Dependent;
import com.locadora.dto.DependentDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.DependentMapper;
import com.locadora.repository.AssociateRepository;
import com.locadora.repository.DependentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DependentService {

    private final DependentRepository dependentRepository;
    private final DependentMapper dependentMapper;
    private final AssociateRepository associateRepository;

    public DependentDTO insertDependent(DependentDTO dto) {
        checkIfAssociateIsAvailable(dto.associate().numInscription());
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

    public DependentDTO changeStatus(int numInscription, boolean status) {
        Dependent dependent = findByDependent(numInscription);
        if(status) {
            checkIfAssociateIsAvailable(dependent.getAssociate().getNumInscription());
            checkIfAssociateIsActive(dependent.getAssociate());
        }
        dependent.setActive(status);
        return dependentMapper.toDTO(dependentRepository.save(dependent));
    }

    private void checkIfAssociateIsActive(Associate associate) {
        if(!associate.isActive()) {
            throw new RegraNegocioException("O sócio não está ativo");
        }
    }

    private Optional<Associate> findActiveAssociateByDependentNumInscription(int dependent_id) {
        return associateRepository.findAll()
                .stream()
                .filter(associate -> associate.isActive() && associate.getDependents().contains(dependent_id))
                .findFirst();
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

    private void checkIfAssociateIsAvailable(int associate_id) {
        List<Dependent> dependents = dependentRepository.findAllByAssociateNumInscriptionAndActiveIsTrue(associate_id);
        if(dependents.size() > 2) {
            throw new RegraNegocioException("O sócio já possui três dependentes ativos");
        }
    }

}
