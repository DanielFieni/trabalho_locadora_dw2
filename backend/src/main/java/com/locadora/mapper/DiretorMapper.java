package com.locadora.mapper;

import com.locadora.domain.Diretor;
import com.locadora.dto.DiretorDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class DiretorMapper implements EntidadeMapper<Diretor, DiretorDTO> {
}
