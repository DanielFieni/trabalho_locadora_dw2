package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.lang.reflect.Member;
import java.time.LocalDate;

public record DependentDTO(
        int numInscription,
        String name,
        LocalDate dtBirth,
        char sex,
        boolean active,

        @NotBlank
        @NotNull
        AssociateDTO associate
) {
}
