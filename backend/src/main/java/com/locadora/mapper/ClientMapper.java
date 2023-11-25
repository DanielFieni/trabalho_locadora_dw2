package com.locadora.mapper;

import com.locadora.domain.Client;
import com.locadora.dto.ClientDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface ClientMapper extends EntityMapper<Client, ClientDTO> {
}
