package com.locadora.mapper;

import com.locadora.domain.Item;
import com.locadora.dto.ItemDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class ItemMapper implements EntidadeMapper<Item, ItemDTO> {
}
