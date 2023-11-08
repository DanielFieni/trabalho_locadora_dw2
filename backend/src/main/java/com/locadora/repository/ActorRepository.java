package com.locadora.repository;

import com.locadora.domain.Actor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Integer> {

    List<Actor> findAllByOrderByName();

}
