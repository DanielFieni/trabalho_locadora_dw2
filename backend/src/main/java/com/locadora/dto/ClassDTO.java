package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassDTO {

    @JsonProperty("_id")
    private int id;

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    @Positive
    private double valueClass;

    @NotBlank
    @NotNull
    @Positive
    private int returnDate;

}
