package com.locadora.service;

import com.locadora.domain.Title;
import com.locadora.dto.TitleDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.TitleMapper;
import com.locadora.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TitleService {

    private final TitleRepository titleRepository;
    private final TitleMapper titleMapper;
    private final AtorService atorService;
    private final ClasseService classeService;
    private final DiretorService diretorService;

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

        titleRepository.delete(findByIdTitle(id));

    }

    private Title findByIdTitle(int id) {
        return titleRepository.findById(id).orElseThrow( () -> new RegraNegocioException("Título não encontrado") );
    }

    private void verifyFieldsTitle(TitleDTO dto) {

        atorService.getByIdAtor(dto.getAtor().getId());
        classeService.getByIdClasse(dto.getClasse().getId());
        diretorService.getByIdDiretor(dto.getDiretor().getId());

        if(dto.getName().isEmpty() || dto.getName().isBlank() || dto.getName() == null) {
            throw new RegraNegocioException("Nome inválido! O NOME não pode ser vázio");
        }

        if(dto.getYear() < 0 || dto.getYear() > 2023) {
            throw new RegraNegocioException("Ano inválido! O ANO deve ser maior que 0 e menor que 2023");
        }

        if(dto.getSynopsis().isBlank() || dto.getSynopsis().isEmpty() || dto.getSynopsis() == null) {
            throw new RegraNegocioException("Sinopse inválida! A SINOPSE não pode ser vazia");
        }

        if(dto.getCategory().isBlank() || dto.getCategory().isEmpty() || dto.getCategory() == null) {
            throw new RegraNegocioException("Categoria inválida! A CATEGORIA não pode ser vazia");
        }

    }

}
