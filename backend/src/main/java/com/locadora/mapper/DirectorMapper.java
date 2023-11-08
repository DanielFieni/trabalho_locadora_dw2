package com.locadora.mapper;

import com.locadora.domain.Director;
import com.locadora.dto.DirectorDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class DirectorMapper implements EntityMapper<Director, DirectorDTO> {
}
