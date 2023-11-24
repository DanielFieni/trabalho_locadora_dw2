package com.locadora.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "associate", schema = "locadora")
public class Associate extends Client implements Serializable {

    @Column(name = "cpf", columnDefinition = "varchar(11)", length = 11)
    private String cpf;
    @Column(name = "address", columnDefinition = "varchar(150)")
    private String address;
    @Column(name = "phone", columnDefinition = "varchar(20)")
    private String phone;
    @OneToMany(mappedBy = "associate", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Dependent> dependents;

}
