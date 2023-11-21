package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.locadora.domain.Dependent;

import java.time.LocalDate;
import java.util.List;

public record AssociateDTO(
        int numInscription,
        String name,
        LocalDate dtBirth,
        char sex,
        boolean active,
        String cpf,
        String address,
        String phone
//        List<DependentDTO> dependents
) {
}
