package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record ClientDTO(
        int numInscription,
        String name,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dtBirth,
        String sex,
        boolean active

) {
}
