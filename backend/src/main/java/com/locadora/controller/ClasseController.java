package com.locadora.controller;

import com.locadora.dto.ClasseDTO;
import com.locadora.service.ClasseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/classe")
@RequiredArgsConstructor
public class ClasseController {

    private final ClasseService classeService;

    @PostMapping
    public ResponseEntity<ClasseDTO> insert(@RequestBody @Valid ClasseDTO classeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classeService.insertClasse(classeDTO));
    }

    @GetMapping
    public ResponseEntity<List<ClasseDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(classeService.getAllClasse());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClasseDTO> getById(@PathVariable @Valid int id) {
        return ResponseEntity.status(HttpStatus.OK).body(classeService.getByIdClasse(id))   ;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable(name = "id") int id) {
        classeService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClasseDTO> update(@PathVariable int id, @RequestBody @Valid ClasseDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(classeService.updateClasse(id, dto));
    }

}
