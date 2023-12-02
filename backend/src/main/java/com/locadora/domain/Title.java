package com.locadora.domain;

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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "title_actor",
            joinColumns = @JoinColumn(name = "title_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id"),
            schema = "locadora"
    )
    private List<Actor> actors = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "director_id", nullable = false)
    private Director director;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "class_id", nullable = false)
    private Class aClass;

    @OneToMany(mappedBy = "title")
    private List<Item> items;

}
