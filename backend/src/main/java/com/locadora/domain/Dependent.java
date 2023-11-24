package com.locadora.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "dependent", schema = "locadora")
public class Dependent extends Client implements Serializable {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "associate_id", nullable = false)
    private Associate associate;

}
