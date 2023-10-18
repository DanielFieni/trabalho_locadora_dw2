package com.locadora.controller;

import com.locadora.dto.DiretorDTO;
import com.locadora.service.DiretorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/diretor")
@RequiredArgsConstructor
public class DiretorController {

    private final DiretorService diretorService;

    @PostMapping
    public ResponseEntity<DiretorDTO> insert(@RequestBody DiretorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diretorService.insertDiretor(dto));
    }

    @GetMapping
    public ResponseEntity<List<DiretorDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(diretorService.getAllDiretor());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiretorDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(diretorService.getByIdDiretor(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        diretorService.deleteDiretor(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiretorDTO> update(@PathVariable int id, @RequestBody DiretorDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(diretorService.updateDiretor(id, dto));
    }

}
