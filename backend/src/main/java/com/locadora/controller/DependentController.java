package com.locadora.controller;

import com.locadora.dto.DependentDTO;
import com.locadora.service.DependentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/dependent")
@RequiredArgsConstructor
@Tag(name="locadora/dependent")
public class DependentController {

    private final DependentService dependentService;

    // Insert Dependent
    @PostMapping
    public ResponseEntity<DependentDTO> insert(@RequestBody DependentDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dependentService.insertDependent(dto));
    }

    // Return all dependents
    @GetMapping
    public ResponseEntity<List<DependentDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(dependentService.getAllDependents());
    }

    // Return dependent that own specified numInscription
    @GetMapping("/{numInscription}")
    public ResponseEntity<DependentDTO> find(@PathVariable int numInscription) {
        return ResponseEntity.status(HttpStatus.OK).body(dependentService.getDependent(numInscription));
    }

    // Delete a Dependent
    @DeleteMapping("/{numInscription}")
    public ResponseEntity<Void> delete(int numInscription) {
        dependentService.deleteDependent(numInscription);
        return ResponseEntity.noContent().build();
    }

    // Update information of the dependent
    @PutMapping("/{numInscription}")
    public ResponseEntity<DependentDTO> update(@RequestBody DependentDTO dto, @PathVariable int numInscription) {
        return ResponseEntity.status(HttpStatus.OK).body(dependentService.updateDependent(dto, numInscription));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<DependentDTO> changeStatus(
            @RequestParam(name = "status") boolean status,
            @PathVariable int id
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(dependentService.changeStatus(id, status));
    }

}
