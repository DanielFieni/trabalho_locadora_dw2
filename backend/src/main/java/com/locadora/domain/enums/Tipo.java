package com.locadora.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum Tipo {

    FITA(1, "Fita"),
    DVD (2, "DVD"),
    BLUERAY (3, "BlueRay");

    private int id;
    private String description;

}
