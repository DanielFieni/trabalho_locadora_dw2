package com.locadora.controller;

import com.locadora.dto.AtorDTO;
import com.locadora.service.AtorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/ator")
@RequiredArgsConstructor
public class AtorController {

    private final AtorService atorService;

    @PostMapping
    public ResponseEntity<AtorDTO> insert(@RequestBody @Valid AtorDTO ator) {
        return ResponseEntity.status(HttpStatus.CREATED).body(atorService.insertAtor(ator));
    }

    @GetMapping
    public ResponseEntity<List<AtorDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(atorService.getAllAtor());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AtorDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(atorService.getByIdAtor(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        atorService.deleteAtor(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AtorDTO> update(@PathVariable int id, @RequestBody AtorDTO ator) {
        return ResponseEntity.status(HttpStatus.OK).body(atorService.updateAtor(id, ator));
    }

}
