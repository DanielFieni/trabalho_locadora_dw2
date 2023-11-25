package com.locadora.mapper;

import com.locadora.domain.Rent;
import com.locadora.dto.RentDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface RentMapper extends EntityMapper<Rent, RentDTO> {
}
