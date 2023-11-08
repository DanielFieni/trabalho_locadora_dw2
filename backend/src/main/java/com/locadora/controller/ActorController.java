package com.locadora.controller;

import com.locadora.dto.ActorDTO;
import com.locadora.service.ActorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/actor")
@RequiredArgsConstructor
@Tag(name = "locadora/actor")
public class ActorController {

    private final ActorService actorService;

    @Operation(summary = "Inserir um Ator")
    @PostMapping
    public ResponseEntity<ActorDTO> insert(@RequestBody @Valid ActorDTO ator) {
        return ResponseEntity.status(HttpStatus.CREATED).body(actorService.insertActor(ator));
    }

    @Operation(summary = "Retornar todos os Atores")
    @GetMapping
    public ResponseEntity<List<ActorDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(actorService.getAllActor());
    }

    @Operation(summary = "Retornar Ator que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<ActorDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(actorService.getByIdActor(id));
    }

    @Operation(summary = "Deletar um Ator")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        actorService.deleteActor(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de um determinado Ator")
    @PutMapping("/{id}")
    public ResponseEntity<ActorDTO> update(@PathVariable int id, @RequestBody ActorDTO ator) {
        return ResponseEntity.status(HttpStatus.OK).body(actorService.updateActor(id, ator));
    }

}
