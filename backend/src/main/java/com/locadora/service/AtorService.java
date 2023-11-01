package com.locadora.service;

import com.locadora.domain.Ator;
import com.locadora.domain.Title;
import com.locadora.dto.AtorDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.AtorMapper;
import com.locadora.repository.AtorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AtorService {

    private final AtorRepository atorRepository;
    private final AtorMapper atorMapper;

    public AtorDTO insertAtor(AtorDTO dto) {
        verifyNameEmpty(dto.getName());
        Ator ator = atorMapper.toEntity(dto);
        return atorMapper.toDTO(atorRepository.save(ator));
    }

    public List<AtorDTO> getAllAtor() {
        return atorMapper.toDTO(atorRepository.findAllByOrderByName());
    }

    public void deleteAtor(int id) {
        Ator ator = findByIdAtor(id);
//        checkIfTitleListIsEmpty(ator.getListTitle());
        atorRepository.delete(ator);
    }

    public AtorDTO updateAtor(int id, AtorDTO dto) {
        verifyNameEmpty(dto.getName());
        findByIdAtor(id);
        Ator ator = atorMapper.toEntity(dto);
        return atorMapper.toDTO(atorRepository.save(ator));
    }

    private boolean verifyNameEmpty(String name) {
        if (name == null || name.isEmpty() || name.isBlank()) {
            throw new RegraNegocioException("Nome Vazio! Insira um nome válido");
        }
        return false;
    }

    public AtorDTO getByIdAtor(int id) {
        return atorMapper.toDTO(findByIdAtor(id));
    }

    private Ator findByIdAtor(int id) {
        return atorRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Ator não encontrado"));
    }

    private void checkIfTitleListIsEmpty(List<Title> titleList) {
        if(!titleList.isEmpty())
            throw new RegraNegocioException("O Ator não deve estar ligado a nenhum Título para ser excluído");
    }

}
