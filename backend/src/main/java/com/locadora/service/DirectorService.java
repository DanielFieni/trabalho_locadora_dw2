package com.locadora.service;

import com.locadora.domain.Director;
import com.locadora.domain.Title;
import com.locadora.dto.DirectorDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.DirectorMapper;
import com.locadora.repository.DirectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DirectorService {

    private final DirectorRepository directorRepository;
    private final DirectorMapper directorMapper;

    public DirectorDTO insertDiretor(DirectorDTO dto) {
        verifyNameEmpty(dto.getName());
        Director director = directorMapper.toEntity(dto);
        return directorMapper.toDTO(directorRepository.save(director));
    }

    public List<DirectorDTO> getAllDiretor() {
        return directorMapper.toDTO(directorRepository.findAllByOrderByName());
    }

    public void deleteDiretor(int id) {
        Director director = findByIdDiretor(id);
        checkIsTitleListIsEmpty(director.getTitles());
        directorRepository.delete(director);
    }

    public DirectorDTO updateDiretor(int id, DirectorDTO dto) {
        verifyNameEmpty(dto.getName());
        findByIdDiretor(id);
        Director director = directorMapper.toEntity(dto);
        return directorMapper.toDTO(directorRepository.save(director));
    }

    private Director findByIdDiretor(int id) {
        return directorRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Diretor não encontrado"));
    }

    public DirectorDTO getByIdDiretor(int id) {
        return directorMapper.toDTO(findByIdDiretor(id));
    }

    public void verifyNameEmpty(String name) {
        if(name.isEmpty() || name.isBlank()) {
            throw new RegraNegocioException("Nome do diretor inválido! Nome não pode ser vazio");
        }
    }

    private void checkIsTitleListIsEmpty(List<Title> titleList) {

        if(!titleList.isEmpty())
            throw new RegraNegocioException("O Diretor não deve estar ligado a nenhum Título para ser excluído");

    }

}
