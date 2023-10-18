package com.locadora.mapper;

import com.locadora.domain.Title;
import com.locadora.dto.TitleDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface TitleMapper extends EntidadeMapper<Title, TitleDTO> {

    @Override
    @Mapping(source = "ator.name", target = "ator.name")
    @Mapping(source = "ator.id", target = "ator.id")
    TitleDTO toDTO(Title title);

}
