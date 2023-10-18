package com.locadora.repository;

import com.locadora.domain.Ator;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtorRepository extends JpaRepository<Ator, Integer> {

    List<Ator> findAllByOrderByName();

}
