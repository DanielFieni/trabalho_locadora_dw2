package com.locadora.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.locadora.domain.enums.Tipo;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "item", schema = "locadora")
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "Int")
    private int id;

    @Column(name = "numSerie", columnDefinition = "varchar(40)")
    private String numSerie;

    @Column(name = "dataPurchase")
    private LocalDate datePurchase;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "title_id")
    private Title title;

    @Column(name = "type", columnDefinition = "varchar(20)")
    private String type;

}
