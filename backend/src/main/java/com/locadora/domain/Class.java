package com.locadora.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "class", schema = "locadora")
public class Class implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "value")
    private double valueClass;

    @Column(name = "returnDate")
    private int returnDate;

}
