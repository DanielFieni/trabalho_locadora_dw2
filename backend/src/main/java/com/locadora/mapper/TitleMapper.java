package com.locadora.mapper;

import com.locadora.domain.Ator;
import com.locadora.domain.Title;
import com.locadora.dto.AtorDTO;
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
public interface TitleMapper extends EntidadeMapper<Title, TitleDTO> {

    AtorDTO toAtorDTO(Ator ator);

    @Mapping(target = "atores", source = "atores", qualifiedByName = "toAtorDTO")
    TitleDTO toDTO(Title title);

    @Named("toAtorDTO")
    default List<AtorDTO> mapAtoresToAtorDTO(List<Ator> atores) {
        return atores.stream()
                .map(this::toAtorDTO)
                .collect(Collectors.toList());
    }

}
