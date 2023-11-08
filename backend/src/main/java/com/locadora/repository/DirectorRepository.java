package com.locadora.repository;

import com.locadora.domain.Director;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Integer> {

    List<Director> findAllByOrderByName();

}
