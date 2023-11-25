package com.locadora.service;

import com.locadora.mapper.ClientMapper;
import com.locadora.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;

    public void getClientsAvailable() {

    }

    // Get all clients active
    public void getClientsActive() {

    }

}
