package com.locadora.service;

import com.locadora.domain.Diretor;
import com.locadora.domain.Title;
import com.locadora.dto.DiretorDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.DiretorMapper;
import com.locadora.repository.DiretorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DiretorService {

    private final DiretorRepository diretorRepository;
    private final DiretorMapper diretorMapper;

    public DiretorDTO insertDiretor(DiretorDTO dto) {
        verifyNameEmpty(dto.getName());
        Diretor diretor = diretorMapper.toEntity(dto);
        return diretorMapper.toDTO(diretorRepository.save(diretor));
    }

    public List<DiretorDTO> getAllDiretor() {
        return diretorMapper.toDTO(diretorRepository.findAllByOrderByName());
    }

    public void deleteDiretor(int id) {
        Diretor diretor = findByIdDiretor(id);
//        checkIsTitleListIsEmpty(diretor.getListTitle());
        diretorRepository.delete(diretor);
    }

    public DiretorDTO updateDiretor(int id, DiretorDTO dto) {
        verifyNameEmpty(dto.getName());
        findByIdDiretor(id);
        Diretor diretor = diretorMapper.toEntity(dto);
        return diretorMapper.toDTO(diretorRepository.save(diretor));
    }

    private Diretor findByIdDiretor(int id) {
        return diretorRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Diretor não encontrado"));
    }

    public DiretorDTO getByIdDiretor(int id) {
        return diretorMapper.toDTO(findByIdDiretor(id));
    }

    public boolean verifyNameEmpty(String name) {
        if(name.isEmpty() || name.isBlank() || name == null) {
            throw new RegraNegocioException("Nome do diretor inválido! Nome não pode ser vazio");
        }
        return false;
    }

    private void checkIsTitleListIsEmpty(List<Title> titleList) {

        if(!titleList.isEmpty())
            throw new RegraNegocioException("O Diretor não deve estar ligado a nenhum Título para ser excluído");

    }

}
