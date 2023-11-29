package com.locadora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.locadora.domain.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query(value = """
            SELECT * FROM locadora.item i
            WHERE i.id NOT IN (
                SELECT i.id FROM locadora.item i
                    INNER JOIN locadora.rent r ON r.item_id = i.id
            WHERE r.return_date IS NULL)
            """, nativeQuery = true)
    List<Item> findAllItemsThatNotRented();

}
