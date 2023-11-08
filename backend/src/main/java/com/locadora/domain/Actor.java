package com.locadora.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "actor", schema = "locadora")
public class Actor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int")
    private int id;

    @Column(name = "name", columnDefinition = "varchar(40)")
    private String name;

    @ManyToMany(mappedBy = "actors")
    private List<Title> titles;

}
