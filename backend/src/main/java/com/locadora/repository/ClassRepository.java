package com.locadora.repository;

import com.locadora.domain.Class;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<Class, Integer> {

    List<Class> findAllByOrderByName();

}
