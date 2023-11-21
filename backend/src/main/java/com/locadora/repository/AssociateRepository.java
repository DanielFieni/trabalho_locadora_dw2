package com.locadora.repository;

import com.locadora.domain.Associate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssociateRepository extends JpaRepository<Associate, Integer> {

    Optional<Associate> findAssociateByNumInscription(int numInscription);

}
