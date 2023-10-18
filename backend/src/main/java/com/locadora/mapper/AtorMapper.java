package com.locadora.mapper;

import com.locadora.domain.Ator;
import com.locadora.dto.AtorDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class AtorMapper implements EntidadeMapper<Ator, AtorDTO> {

}
