package com.locadora.controller;

import com.locadora.dto.AtorDTO;
import com.locadora.service.AtorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/ator")
@RequiredArgsConstructor
@Tag(name = "locadora/ator")
public class AtorController {

    private final AtorService atorService;

    @Operation(summary = "Inserir um Ator")
    @PostMapping
    public ResponseEntity<AtorDTO> insert(@RequestBody @Valid AtorDTO ator) {
        return ResponseEntity.status(HttpStatus.CREATED).body(atorService.insertAtor(ator));
    }

    @Operation(summary = "Retornar todos os Atores")
    @GetMapping
    public ResponseEntity<List<AtorDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(atorService.getAllAtor());
    }

    @Operation(summary = "Retornar Ator que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<AtorDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(atorService.getByIdAtor(id));
    }

    @Operation(summary = "Deletar um Ator")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        atorService.deleteAtor(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de um determinado Ator")
    @PutMapping("/{id}")
    public ResponseEntity<AtorDTO> update(@PathVariable int id, @RequestBody AtorDTO ator) {
        return ResponseEntity.status(HttpStatus.OK).body(atorService.updateAtor(id, ator));
    }

}
