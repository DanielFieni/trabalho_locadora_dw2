package com.locadora.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TitleDTO {

    @JsonProperty("_id")
    private int id;
    @Size(max = 50)
    private String name;
    private int year;
    private String synopsis;
    private String category;
    private List<ActorDTO> actors;
    private ClassDTO aClass;
    private DirectorDTO director;

}
