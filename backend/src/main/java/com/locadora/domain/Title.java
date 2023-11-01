package com.locadora.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "title", schema = "locadora")
public class Title implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", columnDefinition = "varchar(50)")
    @Size(max = 50)
    private String name;

    @Column(name = "year", columnDefinition = "int")
    private int year;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "category", columnDefinition = "varchar(50)")
    private String category;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "titulo_ator",
            joinColumns = @JoinColumn(name = "titulo_id"),
            inverseJoinColumns = @JoinColumn(name = "ator_id"),
            schema = "locadora"
    )
    private List<Ator> atores = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_diretor", nullable = false)
    private Diretor diretor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_classe", nullable = false)
    private Classe classe;

}
