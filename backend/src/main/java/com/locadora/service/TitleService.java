package com.locadora.service;

import com.locadora.domain.Item;
import com.locadora.domain.Title;
import com.locadora.dto.TitleDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.TitleMapper;
import com.locadora.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TitleService {

    private final TitleRepository titleRepository;
    private final TitleMapper titleMapper;
    private final ClassService classService;
    private final DirectorService directorService;

    @Transactional
    public TitleDTO insertTitle(TitleDTO dto) {
        verifyFieldsTitle(dto);
        Title title = titleMapper.toEntity(dto);
        return titleMapper.toDTO(titleRepository.save(title));
    }

    public TitleDTO updateTitle(int id, TitleDTO dto) {
        verifyFieldsTitle(dto);
        findByIdTitle(id);
        Title title = titleMapper.toEntity(dto);
        return titleMapper.toDTO(titleRepository.save(title));
    }

    public TitleDTO getByIdTitle(int id) {
        return titleMapper.toDTO(findByIdTitle(id));
    }

    public List<TitleDTO> getAll() {
        return titleMapper.toDTO(titleRepository.findAllByOrderByName());
    }

    public void deleteTitle(int id){
        Title title = findByIdTitle(id);
        checkIsItemListIsEmpty(title.getItems());
        titleRepository.delete(findByIdTitle(id));
    }

    private void checkIsItemListIsEmpty(List<Item> items) {
        if(!items.isEmpty()) {
            throw new RegraNegocioException("O Título não deve estar ligado a nenhum Item para ser excluído");
        }
    }

    private Title findByIdTitle(int id) {
        return titleRepository.findById(id).orElseThrow( () -> new RegraNegocioException("Título não encontrado") );
    }

    private void verifyFieldsTitle(TitleDTO dto) {

        classService.getByIdClasse(dto.getAClass().getId());
        directorService.getByIdDiretor(dto.getDirector().getId());

        if(dto.getName().isEmpty() || dto.getName().isBlank()) {
            throw new RegraNegocioException("Nome inválido! O NOME não pode ser vázio");
        }

        if(dto.getYear() < 0 || dto.getYear() > 2030) {
            throw new RegraNegocioException("Ano inválido! O ANO deve ser maior que 0 e menor que 2023");
        }

        if(dto.getSynopsis().isBlank() || dto.getSynopsis().isEmpty()) {
            throw new RegraNegocioException("Sinopse inválida! A SINOPSE não pode ser vazia");
        }

        if(dto.getCategory().isBlank() || dto.getCategory().isEmpty()) {
            throw new RegraNegocioException("Categoria inválida! A CATEGORIA não pode ser vazia");
        }

    }

}
