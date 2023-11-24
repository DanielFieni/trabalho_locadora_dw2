package com.locadora.repository;

import com.locadora.domain.Associate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssociateRepository extends JpaRepository<Associate, Integer> {

    @Query(value = 
        """
            SELECT * FROM locadora.client c
            INNER JOIN locadora.associate a ON a.num_inscription = c.num_inscription
            WHERE c.active AND (SELECT count(*) FROM locadora.client c1
                                INNER JOIN locadora.dependent d1 ON d1.num_inscription = c1.num_inscription
                                WHERE c1.active AND d1.associate_id = a.num_inscription) < 3
        """,
        nativeQuery = true
    )
    List<Associate> getAllAssociateAvailable();

    Optional<Associate> findAssociateByNumInscription(int numInscription);

}
