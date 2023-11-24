package com.locadora.mapper;

import com.locadora.domain.Associate;
import com.locadora.domain.Dependent;
import com.locadora.dto.AssociateDTO;
import com.locadora.dto.DependentDTO;
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
public interface AssociateMapper extends EntityMapper<Associate, AssociateDTO>{

//    DependentDTO toDependentDTO(Dependent dependent);

//    @Mapping(target = "dependents", source = "dependents", qualifiedByName = "toDependentDTO")
//    AssociateDTO toDTO(Associate associate);

//    @Named("toDependentDTO")
//    default List<DependentDTO> mapDependentsToDepdendentDTO(List<Dependent> dependents) {
//         return dependents.stream()
//                .map(this::toDependentDTO)
//                .collect(Collectors.toList());
//    }

}
