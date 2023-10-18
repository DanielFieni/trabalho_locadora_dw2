package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TitleDTO {

    @JsonProperty("_id")
    private int id;
    private String name;
    private int year;
    private String synopsis;
    private String category;
    private AtorDTO ator;
    private ClasseDTO classe;
    private DiretorDTO diretor;

}
