package com.locadora.mapper;

import com.locadora.domain.Actor;
import com.locadora.domain.Title;
import com.locadora.dto.ActorDTO;
import com.locadora.dto.TitleDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface TitleMapper extends EntityMapper<Title, TitleDTO> {

    ActorDTO toActorDTO(Actor actor);

    @Mapping(target = "actors", source = "actors", qualifiedByName = "toActorDTO")
    TitleDTO toDTO(Title title);

    @Named("toActorDTO")
    default List<ActorDTO> mapActorsToActorDTO(List<Actor> actors) {
        return actors.stream()
                .map(this::toActorDTO)
                .collect(Collectors.toList());
    }

}
