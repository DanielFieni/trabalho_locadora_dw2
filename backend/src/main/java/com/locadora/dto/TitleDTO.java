package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

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
    private List<AtorDTO> atores;
    private ClasseDTO classe;
    private DiretorDTO diretor;

}
