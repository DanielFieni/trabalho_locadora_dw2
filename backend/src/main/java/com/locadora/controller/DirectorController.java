package com.locadora.controller;

import com.locadora.dto.DirectorDTO;
import com.locadora.service.DirectorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/director")
@RequiredArgsConstructor
@Tag(name = "locadora/director")
public class DirectorController {

    private final DirectorService directorService;

    @Operation(summary = "Inserir um Diretor")
    @PostMapping
    public ResponseEntity<DirectorDTO> insert(@RequestBody DirectorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(directorService.insertDiretor(dto));
    }

    @Operation(summary = "Retornar todos os Diretores")
    @GetMapping
    public ResponseEntity<List<DirectorDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(directorService.getAllDiretor());
    }

    @Operation(summary = "Retornar Diretor que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<DirectorDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(directorService.getByIdDiretor(id));
    }

    @Operation(summary = "Deletar um Diretor")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        directorService.deleteDiretor(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de um determinado Diretor")
    @PutMapping("/{id}")
    public ResponseEntity<DirectorDTO> update(@PathVariable int id, @RequestBody DirectorDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(directorService.updateDiretor(id, dto));
    }

}
