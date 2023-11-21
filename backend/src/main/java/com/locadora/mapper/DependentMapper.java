package com.locadora.mapper;

import com.locadora.domain.Dependent;
import com.locadora.dto.DependentDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class DependentMapper implements EntityMapper<Dependent, DependentDTO> {
}
