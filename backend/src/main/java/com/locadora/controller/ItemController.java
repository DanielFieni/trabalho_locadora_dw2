package com.locadora.controller;

import com.locadora.domain.Item;
import com.locadora.dto.ItemDTO;
import com.locadora.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemDTO> insert(@RequestBody ItemDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itemService.insertItem(dto));
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(itemService.getAllItems());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> update(@PathVariable int id, @RequestBody ItemDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(itemService.updateItem(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> find(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(itemService.getByIdItem(id));
    }

}
