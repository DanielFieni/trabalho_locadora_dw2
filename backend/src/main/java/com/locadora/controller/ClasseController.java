package com.locadora.controller;

import com.locadora.dto.ClasseDTO;
import com.locadora.service.ClasseService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/classe")
@RequiredArgsConstructor
@Tag(name = "locadora/classe")
public class ClasseController {

    private final ClasseService classeService;

    @Operation(summary = "Inserir uma Classe")
    @PostMapping
    public ResponseEntity<ClasseDTO> insert(@RequestBody @Valid ClasseDTO classeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classeService.insertClasse(classeDTO));
    }

    @Operation(summary = "Retornar todos as Classes")
    @GetMapping
    public ResponseEntity<List<ClasseDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(classeService.getAllClasse());
    }

    @Operation(summary = "Retornar Classe que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<ClasseDTO> getById(@PathVariable @Valid int id) {
        return ResponseEntity.status(HttpStatus.OK).body(classeService.getByIdClasse(id))   ;
    }

    @Operation(summary = "Deletar uma Classe")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable(name = "id") int id) {
        classeService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de uma determinada Classe")
    @PutMapping("/{id}")
    public ResponseEntity<ClasseDTO> update(@PathVariable int id, @RequestBody @Valid ClasseDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(classeService.updateClasse(id, dto));
    }

}
