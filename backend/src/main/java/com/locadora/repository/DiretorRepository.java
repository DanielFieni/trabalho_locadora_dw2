package com.locadora.repository;

import com.locadora.domain.Diretor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiretorRepository extends JpaRepository<Diretor, Integer> {

    List<Diretor> findAllByOrderByName();

}
