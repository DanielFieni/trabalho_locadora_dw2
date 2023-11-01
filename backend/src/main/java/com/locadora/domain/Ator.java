package com.locadora.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "ator", schema = "locadora")
public class Ator implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int")
    private int id;

    @Column(name = "nome", columnDefinition = "varchar(40)")
    private String name;

//    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "atores")
//    @JsonIgnore
//    private List<Title> listTitle = new ArrayList<>();

}
