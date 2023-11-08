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

    private final ActorRepository ActorRepository;
    private final ActorMapper ActorMapper;

    public ActorDTO insertActor(ActorDTO dto) {
        verifyNameEmpty(dto.getName());
        Actor Actor = ActorMapper.toEntity(dto);
        return ActorMapper.toDTO(ActorRepository.save(Actor));
    }

    public List<ActorDTO> getAllActor() {
        return ActorMapper.toDTO(ActorRepository.findAllByOrderByName());
    }

    public void deleteActor(int id) {
        Actor Actor = findByIdActor(id);
//        checkIfTitleListIsEmpty(Actor.getListTitle());
        ActorRepository.delete(Actor);
    }

    public ActorDTO updateActor(int id, ActorDTO dto) {
        verifyNameEmpty(dto.getName());
        findByIdActor(id);
        Actor Actor = ActorMapper.toEntity(dto);
        return ActorMapper.toDTO(ActorRepository.save(Actor));
    }

    private void verifyNameEmpty(String name) {
        if (name == null || name.isEmpty() || name.isBlank()) {
            throw new RegraNegocioException("Nome Vazio! Insira um nome válido");
        }
    }

    public ActorDTO getByIdActor(int id) {
        return ActorMapper.toDTO(findByIdActor(id));
    }

    private Actor findByIdActor(int id) {
        return ActorRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Ator não encontrado"));
    }

    private void checkIfTitleListIsEmpty(List<Title> titleList) {
        if(!titleList.isEmpty())
            throw new RegraNegocioException("O Ator não deve estar ligado a nenhum Título para ser excluído");
    }

}
