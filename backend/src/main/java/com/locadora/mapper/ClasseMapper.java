package com.locadora.mapper;

import com.locadora.domain.Classe;
import com.locadora.dto.ClasseDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class ClasseMapper implements EntidadeMapper<Classe, ClasseDTO> {
}
