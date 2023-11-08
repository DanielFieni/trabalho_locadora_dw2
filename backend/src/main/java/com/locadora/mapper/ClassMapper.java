package com.locadora.mapper;

import com.locadora.domain.Class;
import com.locadora.dto.ClassDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class ClassMapper implements EntityMapper<Class, ClassDTO> {
}
