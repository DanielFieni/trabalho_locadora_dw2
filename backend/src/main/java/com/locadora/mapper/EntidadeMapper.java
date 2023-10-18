package com.locadora.mapper;

import com.locadora.domain.Title;
import com.locadora.dto.TitleDTO;

import java.util.List;

public interface EntidadeMapper <S, D>{

    S toEntity(D dto);

    D toDTO(S entidade);

    List<S> toEntity(List<D> dtos);

    List<D> toDTO(List<S> entidades);

}
