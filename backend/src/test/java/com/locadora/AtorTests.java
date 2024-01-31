package com.locadora;

import com.locadora.domain.Actor;
import com.locadora.dto.ActorDTO;
import com.locadora.mapper.ActorMapper;
import com.locadora.repository.ActorRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;

import java.util.Optional;


@DataJpaTest
@ActiveProfiles("test")
public class AtorTests {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ActorRepository actorRepository;

    @Test
    @DisplayName("Should return Actor successfully from DB")
    void findActorByIdSuccessfully() {
        Actor actor = new Actor("Daniel");
        entityManager.persist(actor);
        Optional<Actor> result = this.actorRepository.findById(actor.getId());
        assertThat(result.isPresent()).isTrue();
    }

    @Test
    @DisplayName("Should not return Actor from DB when Actor not exists")
    void findActorByIdFailed() {
        Optional<Actor> result = actorRepository.findById(1);
        assertThat(result.isEmpty()).isTrue();
    }

}
