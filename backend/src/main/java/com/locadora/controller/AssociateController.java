package com.locadora.controller;

import com.locadora.dto.AssociateDTO;
import com.locadora.service.AssociateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locadora/associate")
@RequiredArgsConstructor
@Tag(name="/locadora/associate")
public class AssociateController {

    private final AssociateService associateService;

    @Operation(summary = "Inserir um novo Associado")
    @PostMapping
    public ResponseEntity<AssociateDTO> insert(@RequestBody AssociateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(associateService.insertAssociate(dto));
    }

    // Return all Associates
    @Operation(summary = "Retornar todos os Associados")
    @GetMapping
    public ResponseEntity<List<AssociateDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(associateService.getAllAssociate());
    }

    // Return Associate that own specified id
    @Operation(summary = "Retornar Associado com determinado ID")
    @GetMapping("/{id}")
    public ResponseEntity<AssociateDTO> getById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(associateService.getAssociate(id));
    }

    // Delete a Associate
    @Operation(summary = "Deletar um Associado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        associateService.deleteAssociate(id);
        return ResponseEntity.noContent().build();
    }

    // Update information of the Associate
    @Operation(summary = "Atualizar informações de determinado Associado")
    @PutMapping("/{id}")
    public ResponseEntity<AssociateDTO> update(@RequestBody AssociateDTO dto, @PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(associateService.updateAssociate(dto, id));
    }

    @PatchMapping("/{numInscription}")
    public ResponseEntity<AssociateDTO> changeStatus(
            @RequestParam(name = "status") boolean status,
            @PathVariable int numInscription) {
        return ResponseEntity.status(HttpStatus.OK).body(associateService.changeStatus(numInscription, status));
    }

    @GetMapping("/active")
    public ResponseEntity<List<AssociateDTO>> getNotActive() {
        return ResponseEntity.status(HttpStatus.OK).body(associateService.getAssociatesAvailable());
    }

}
