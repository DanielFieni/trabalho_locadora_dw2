package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActorDTO {

    @JsonProperty("_id")
    private int id;

    @NotNull
    @NotBlank
    private String name;

}
