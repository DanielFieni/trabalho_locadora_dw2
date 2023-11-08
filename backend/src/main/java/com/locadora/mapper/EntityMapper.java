package com.locadora.mapper;

import java.util.List;

public interface EntityMapper<S, D>{

    S toEntity(D dto);

    D toDTO(S entidade);

    List<S> toEntity(List<D> dtos);

    List<D> toDTO(List<S> entidades);

}
