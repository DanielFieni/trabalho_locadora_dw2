package com.locadora.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "client", schema = "locadora")
@Inheritance(strategy = InheritanceType.JOINED)
//@MappedSuperclass
public abstract class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numInscription")
    private int numInscription;

    @Column(name = "name", columnDefinition = "varchar(100)")
    private String name;

    @Column(name = "dtBith")
    private LocalDate dtBirth;

    @Column(name = "sex")
    private char sex;

    @Column(name = "active")
    private boolean active;

}
