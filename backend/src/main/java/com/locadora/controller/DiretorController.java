package com.locadora.controller;

import com.locadora.dto.DiretorDTO;
import com.locadora.service.DiretorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/diretor")
@RequiredArgsConstructor
@Tag(name = "locadora/diretor")
public class DiretorController {

    private final DiretorService diretorService;

    @Operation(summary = "Inserir um Diretor")
    @PostMapping
    public ResponseEntity<DiretorDTO> insert(@RequestBody DiretorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diretorService.insertDiretor(dto));
    }

    @Operation(summary = "Retornar todos os Diretores")
    @GetMapping
    public ResponseEntity<List<DiretorDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(diretorService.getAllDiretor());
    }

    @Operation(summary = "Retornar Diretor que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<DiretorDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(diretorService.getByIdDiretor(id));
    }

    @Operation(summary = "Deletar um Diretor")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        diretorService.deleteDiretor(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de um determinado Diretor")
    @PutMapping("/{id}")
    public ResponseEntity<DiretorDTO> update(@PathVariable int id, @RequestBody DiretorDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(diretorService.updateDiretor(id, dto));
    }

}
