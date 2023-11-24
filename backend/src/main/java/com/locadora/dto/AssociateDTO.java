package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public record AssociateDTO(
        int numInscription,
        String name,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dtBirth,
        String sex,
        boolean active,
        String cpf,
        String address,
        String phone
        // List<DependentDTO> dependents
) {
}
