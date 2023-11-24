package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DependentDTO(
        int numInscription,
        String name,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dtBirth,
        String sex,
        boolean active,

        @NotBlank
        @NotNull
        AssociateDTO associate
) {
}
