package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.locadora.domain.Title;

import java.time.LocalDate;
import java.util.List;

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
