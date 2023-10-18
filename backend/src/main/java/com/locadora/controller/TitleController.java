package com.locadora.controller;

import com.locadora.dto.TitleDTO;
import com.locadora.service.TitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/locadora/title")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;

    @PostMapping
    public ResponseEntity<TitleDTO> insert(@RequestBody TitleDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(titleService.insertTitle(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TitleDTO> update(@PathVariable int id, @RequestBody TitleDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(titleService.updateTitle(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TitleDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(titleService.getByIdTitle(id));
    }

    @GetMapping
    public ResponseEntity<List<TitleDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(titleService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        titleService.deleteTitle(id);
        return ResponseEntity.noContent().build();
    }

}
