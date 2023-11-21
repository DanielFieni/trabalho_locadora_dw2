package com.locadora.repository;

import com.locadora.domain.Dependent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DependentRepository extends JpaRepository<Dependent, Integer> {

    Optional<Dependent> findDependentByNumInscription(int numInscription);

    List<Dependent> findAllByAssociateNumInscriptionAndActiveIsTrue(int associate_id);

}
