package com.locadora.controller;

import com.locadora.dto.ClassDTO;
import com.locadora.service.ClassService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/class")
@RequiredArgsConstructor
@Tag(name = "locadora/class")
public class ClassController {

    private final ClassService classService;

    @Operation(summary = "Inserir uma Classe")
    @PostMapping
    public ResponseEntity<ClassDTO> insert(@RequestBody @Valid ClassDTO classDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classService.insertClasse(classDTO));
    }

    @Operation(summary = "Retornar todos as Classes")
    @GetMapping
    public ResponseEntity<List<ClassDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(classService.getAllClasse());
    }

    @Operation(summary = "Retornar Classe que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<ClassDTO> getById(@PathVariable @Valid int id) {
        return ResponseEntity.status(HttpStatus.OK).body(classService.getByIdClasse(id))   ;
    }

    @Operation(summary = "Deletar uma Classe")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable(name = "id") int id) {
        classService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de uma determinada Classe")
    @PutMapping("/{id}")
    public ResponseEntity<ClassDTO> update(@PathVariable int id, @RequestBody @Valid ClassDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(classService.updateClasse(id, dto));
    }

}
