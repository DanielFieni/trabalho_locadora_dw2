package com.locadora.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "title", schema = "locadora")
public class Title implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", columnDefinition = "varchar(100)")
    private String name;

    @Column(name = "year", columnDefinition = "int")
    private int year;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "category")
    private String category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ator")
    private Ator ator;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_diretor")
    private Diretor diretor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_classe")
    private Classe classe;

    public Title(int id, String name, int year, String synopsis, String category, Ator ator, Classe classe, Diretor diretor) {
        this.name = name;
        this.year = year;
        this.synopsis = synopsis;
        this.category = category;
        this.ator = ator;
        this.classe = classe;
        this.diretor = diretor;
    }

}