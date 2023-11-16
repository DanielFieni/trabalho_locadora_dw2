package com.locadora.service;

import com.locadora.domain.Class;
import com.locadora.domain.Title;
import com.locadora.dto.ClassDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.ClassMapper;
import com.locadora.repository.ClassRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClassService {

    private ClassRepository classRepository;
    private ClassMapper classMapper;

    public ClassDTO insertClasse(ClassDTO dto) {
        verifyFieldsEmpty(dto);
        Class aClass = classMapper.toEntity(dto);
        return classMapper.toDTO(classRepository.save(aClass));
    }

    public List<ClassDTO> getAllClasse() {
        return classMapper.toDTO(classRepository.findAllByOrderByName());
    }

    public void deleteClasse(int id) {
        Class aClass = findByIdClasse(id);
        checkIfTitleIsEmpty(aClass.getTitles());
        classRepository.delete(aClass);
    }

    public ClassDTO updateClasse(int id, ClassDTO dto) {
        verifyFieldsEmpty(dto);
        findByIdClasse(id);
        Class aClass = classMapper.toEntity(dto);
        return classMapper.toDTO(classRepository.save(aClass));
    }

    public ClassDTO getByIdClasse(int id) {
        return classMapper.toDTO(findByIdClasse(id));
    }

    private Class findByIdClasse(int id) {
        return classRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Classe não encontrada"));
    }

    private void verifyFieldsEmpty(ClassDTO dto) {
        String msg = "";
        String name = dto.getName();
        double valor = dto.getValueClass();

        if(name.isEmpty() || name.isBlank()) {
            msg += "Nome inválido! O nome não poder ser vazio";
        }

        if(valor < 0) {
            msg += "Valor inválido! O valor tem que ser maior que zero";
        }

        if(!msg.isEmpty()) {
            throw new RegraNegocioException(msg);
        }

    }

    private void checkIfTitleIsEmpty(List<Title> titleList) {
        if(!titleList.isEmpty())
            throw new RegraNegocioException("A classe não deve estar ligado a nenhum Título para ser excluída");
    }

}
