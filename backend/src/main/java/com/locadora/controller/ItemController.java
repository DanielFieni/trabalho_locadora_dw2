package com.locadora.controller;

import com.locadora.domain.Item;
import com.locadora.dto.ItemDTO;
import com.locadora.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/item")
@RequiredArgsConstructor
@Tag(name = "locadora/item")
public class ItemController {

    private final ItemService itemService;

    @Operation(summary = "Inserir um Item")
    @PostMapping
    public ResponseEntity<ItemDTO> insert(@RequestBody ItemDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itemService.insertItem(dto));
    }

    @Operation(summary = "Retornar todos os Itens")
    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(itemService.getAllItems());
    }

    @Operation(summary = "Deletar um Item")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar informações de um determinado Item")
    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> update(@PathVariable int id, @RequestBody ItemDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(itemService.updateItem(id, dto));
    }

    @Operation(summary = "Retornar Item que possua determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> find(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(itemService.getByIdItem(id));
    }

}
