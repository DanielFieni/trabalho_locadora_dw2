package com.locadora.controller;

import com.locadora.dto.ClientDTO;
import com.locadora.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("locadora/clients")
@RequiredArgsConstructor
@Tag(name = "locadora/clients")
public class ClientController {

    private final ClientService clientService;

    // List all clients
    @GetMapping
    public ResponseEntity<List<ClientDTO>> list() {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.getClientsAvailable());
    }

    // Find client by id
    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> find(@PathVariable(name = "id") int id) {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.loadClient(id));
    }

    @GetMapping("/available")
    @Operation(summary = "Get all clients available to rent")
    public ResponseEntity<List<ClientDTO>> getClientsAvailable() {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.getClientsAvailable());  
    }

}
