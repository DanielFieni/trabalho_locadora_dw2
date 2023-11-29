package com.locadora.repository;

import com.locadora.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    @Query(value = """
        SELECT c FROM Client c 
        WHERE c.active AND 
        (
            SELECT count(r) FROM Rent r
            WHERE r.client = c AND r.paid = false
        ) = 0
        """)
    List<Client> findAllClientsIsActiveAndNotDebit();

}
