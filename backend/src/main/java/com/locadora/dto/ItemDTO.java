package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public record ItemDTO(
        @JsonProperty("_id")
        int id,
        String numSerie,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate datePurchase,
        TitleDTO title,
        String type
        ) {
}
