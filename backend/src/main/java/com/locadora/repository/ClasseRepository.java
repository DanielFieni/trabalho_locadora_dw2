package com.locadora.repository;

import com.locadora.domain.Classe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Integer> {

    List<Classe> findAllByOrderByName();

}
