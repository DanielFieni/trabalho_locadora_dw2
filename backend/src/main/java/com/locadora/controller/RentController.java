package com.locadora.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.locadora.dto.RentDTO;
import com.locadora.service.RentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("locadora/rent")
@Tag(name = "locadora/rent")
public class RentController {

    private final RentService rentService;

    // Insert rent
    @PostMapping
    @Operation(summary = "Insert rent")
    public ResponseEntity<RentDTO> insert(@RequestBody RentDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rentService.insertRent(dto));
    }

    // Delete rent
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Rent by id")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        rentService.deleteRent(id);
        return ResponseEntity.noContent().build();
    }

    // Update rent
    @PutMapping("/{id}")
    @Operation(summary = "Update Rent by Id")
    public ResponseEntity<RentDTO> update(@RequestBody RentDTO dto, @PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(rentService.updateRent(dto, id));
    }

    // list rent
    @GetMapping
    @Operation(summary = "List all Rents")
    public ResponseEntity<List<RentDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(rentService.getAllRent());
    }

    // Find Rent by id
    @GetMapping("/{id}")
    public ResponseEntity<RentDTO> find(@PathVariable int id ) {
        return ResponseEntity.status(HttpStatus.OK).body(rentService.loadRent(id));
    }

    // Update AmountCharged Rent
    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateAmountCharged(@PathVariable int id) {
        rentService.makePayment(id);
        return ResponseEntity.noContent().build();
    }

}
