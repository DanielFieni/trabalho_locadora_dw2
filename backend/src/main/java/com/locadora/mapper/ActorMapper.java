package com.locadora.mapper;

import com.locadora.domain.Actor;
import com.locadora.dto.ActorDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class ActorMapper implements EntityMapper<Actor, ActorDTO> {

}
