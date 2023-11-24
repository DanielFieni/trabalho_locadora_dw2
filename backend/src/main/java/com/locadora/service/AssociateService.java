package com.locadora.service;

import com.locadora.domain.Associate;
import com.locadora.domain.Dependent;
import com.locadora.dto.AssociateDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.AssociateMapper;
import com.locadora.repository.AssociateRepository;
import com.locadora.repository.DependentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssociateService {

    private final AssociateRepository associateRepository;
    private final AssociateMapper associateMapper;
    private final DependentRepository dependentRepository;

    public AssociateDTO insertAssociate(AssociateDTO dto) {
        checkFields(dto);
        Associate associate = associateMapper.toEntity(dto);
        associate.setActive(true);
        return associateMapper.toDTO(associateRepository.save(associate));
    }

    public List<AssociateDTO> getAllAssociate() {
        return associateMapper.toDTO(associateRepository.findAll());
    }

    public void deleteAssociate(int id) {
        Associate associate = findByIdAssociate(id);
        associateRepository.delete(associate);
    }

    public AssociateDTO updateAssociate(AssociateDTO dto, int id) {
        checkFields(dto);
        findByIdAssociate(id);
        Associate associate = associateMapper.toEntity(dto);
        return associateMapper.toDTO(associateRepository.save(associate));
    }

    public AssociateDTO getAssociate(int id) {
        return associateMapper.toDTO(findByIdAssociate(id));
    }

    private Associate findByIdAssociate(int id) {
        return associateRepository.findAssociateByNumInscription(id).orElseThrow(
                () -> new RegraNegocioException("Associado não encontrado")
        );
    }

    // Change status of the Associate
    public AssociateDTO changeStatus(int numInscription, boolean status) {
        Associate associate = findByIdAssociate(numInscription);
        if(!status) {
            disableDependents(numInscription);
        }
        associate.setActive(status);
        return associateMapper.toDTO(associateRepository.save(associate));
    }

    // Amount of dependents less than 3 and dependents are active
    public List<AssociateDTO> getAssociatesAvailable() {
        return associateMapper.toDTO(associateRepository.getAllAssociateAvailable());
    }

    private void disableDependents(int associate_id) {
        List<Dependent> dependents = dependentRepository.findAllByAssociateNumInscriptionAndActiveIsTrue(associate_id);
        dependents.stream().forEach(dependent -> dependent.setActive(false));
        dependentRepository.saveAll(dependents);
    }

    private void checkFields(AssociateDTO dto) {
        checkFieldIsEmptyOrBlank(dto.name(), "Nome");
        checkFieldIsEmptyOrBlank(dto.cpf(), "CPF");
        checkFieldIsEmptyOrBlank(dto.address(), "Endereço");
        checkFieldIsEmptyOrBlank(dto.phone(), "Telefone");
    }

    private boolean checkFieldIsEmptyOrBlank(String field, String msg){
        if(field.isBlank() || field.isEmpty()) {
            throw new RegraNegocioException(msg + " inválido!");
        }
        return true;
    }

}
