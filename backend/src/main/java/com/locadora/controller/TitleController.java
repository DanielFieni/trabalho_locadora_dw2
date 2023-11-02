package com.locadora.controller;

import com.locadora.dto.TitleDTO;
import com.locadora.service.TitleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/locadora/title")
@RequiredArgsConstructor
@Tag(name = "locadora/title")
public class TitleController {

    private final TitleService titleService;

    @Operation(summary = "Inserir um Título")
    @PostMapping
    public ResponseEntity<TitleDTO> insert(@RequestBody @Valid TitleDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(titleService.insertTitle(dto));
    }

    @Operation(summary = "Atualizar informações de um determinado Título")
    @PutMapping("/{id}")
    public ResponseEntity<TitleDTO> update(@PathVariable int id, @RequestBody TitleDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(titleService.updateTitle(id, dto));
    }

    @Operation(summary = "Retornar Título que possua um determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<TitleDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(titleService.getByIdTitle(id));
    }

    @Operation(summary = "Retornar todos os Títulos")
    @GetMapping
    public ResponseEntity<List<TitleDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(titleService.getAll());
    }

    @Operation(summary = "Deletar um Título")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        titleService.deleteTitle(id);
        return ResponseEntity.noContent().build();
    }

}
