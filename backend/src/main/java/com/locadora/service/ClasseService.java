package com.locadora.service;

import com.locadora.domain.Classe;
import com.locadora.domain.Title;
import com.locadora.dto.ClasseDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.ClasseMapper;
import com.locadora.repository.ClasseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClasseService {

    private ClasseRepository classeRepository;
    private ClasseMapper classeMapper;

    public ClasseDTO insertClasse(ClasseDTO dto) {
        verifyFieldsEmpty(dto);
        Classe classe = classeMapper.toEntity(dto);
        return classeMapper.toDTO(classeRepository.save(classe));
    }

    public List<ClasseDTO> getAllClasse() {
        return classeMapper.toDTO(classeRepository.findAllByOrderByName());
    }

    public void deleteClasse(int id) {
        Classe classe = findByIdClasse(id);
        checkIfTitleIsEmpty(classe.getListTitle());
        classeRepository.delete(classe);
    }

    public ClasseDTO updateClasse(int id, ClasseDTO dto) {
        verifyFieldsEmpty(dto);
        findByIdClasse(id);
        Classe classe = classeMapper.toEntity(dto);
        return classeMapper.toDTO(classeRepository.save(classe));
    }

    public ClasseDTO getByIdClasse(int id) {
        return classeMapper.toDTO(findByIdClasse(id));
    }

    private Classe findByIdClasse(int id) {
        return classeRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Classe não encontrada"));
    }

    private boolean verifyFieldsEmpty(ClasseDTO dto) {
        String msg = "";
        String name = dto.getName();
        Double valor = dto.getValor();

        if(name.isEmpty() || name.isBlank() || name == null) {
            msg += "Nome inválido! ";
        }

        if(valor < 0) {
            msg += "Valor inválido! ";
        }

        if(!msg.isEmpty()) {
            throw new RegraNegocioException(msg);
        }

        return true;
    }

    private void checkIfTitleIsEmpty(List<Title> titleList) {
        if(!titleList.isEmpty())
            throw new RegraNegocioException("A classe não deve estar ligado a nenhum Título para ser excluída");
    }

}
