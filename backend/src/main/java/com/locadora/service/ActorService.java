package com.locadora.service;

import com.locadora.domain.Actor;
import com.locadora.domain.Title;
import com.locadora.dto.ActorDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.ActorMapper;
import com.locadora.repository.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActorService {

    private final ActorRepository actorRepository;
    private final ActorMapper actorMapper;

    public ActorDTO insertActor(ActorDTO dto) {
        verifyNameEmpty(dto.getName());
        Actor actor = actorMapper.toEntity(dto);
        return actorMapper.toDTO(actorRepository.save(actor));
    }

    public List<ActorDTO> getAllActor() {
        return actorMapper.toDTO(actorRepository.findAllByOrderByName());
    }

    public void deleteActor(int id) {
        Actor actor = findByIdActor(id);
        checkIfTitleListIsEmpty(actor.getTitles());
        actorRepository.delete(actor);
    }

    public ActorDTO updateActor(int id, ActorDTO dto) {
        verifyNameEmpty(dto.getName());
        findByIdActor(id);
        Actor actor = actorMapper.toEntity(dto);
        return actorMapper.toDTO(actorRepository.save(actor));
    }

    private void verifyNameEmpty(String name) {
        if (name == null || name.isEmpty() || name.isBlank()) {
            throw new RegraNegocioException("Nome Vazio! Insira um nome válido");
        }
    }

    public ActorDTO getByIdActor(int id) {
        return actorMapper.toDTO(findByIdActor(id));
    }

    private Actor findByIdActor(int id) {
        return actorRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Ator não encontrado"));
    }

    private void checkIfTitleListIsEmpty(List<Title> titleList) {
        if(!titleList.isEmpty()) {
            throw new RegraNegocioException("O Ator não deve estar ligado a nenhum Título para ser excluído");
        }
    }

}
