package com.locadora.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "classe", schema = "locadora")
public class Classe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nome", length = 20)
    private String name;

    @Column(name = "valor")
    private double valor;

    @Column(name = "prazoDevolucao")
    private int prazoDevolucao;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private List<Title> listTitle = new ArrayList<>();

    public Classe(int id, String name, double valor, int prazoDevolucao) {
        this.name = name;
        this.valor = valor;
        this.prazoDevolucao = prazoDevolucao;
        this.id = id;
    }

}
