package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public record RentDTO(
        @JsonProperty("_id")
        int id,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate rentalDate,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate expectedReturnDate,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate returnDate,
        double amountCharged,
        double fineCharged,
        boolean paid,
        ClientDTO client,
        ItemDTO item
) {
}
