package com.locadora.service;

import com.locadora.domain.Client;
import com.locadora.dto.ClientDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.ClientMapper;
import com.locadora.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;

    // Verify ig client is active and not have debit
    public List<ClientDTO> getClientsAvailable() {
        return clientMapper.toDTO(clientRepository.findAllClientsIsActiveAndNotDebit());
    }

    public ClientDTO loadClient(int id) {
        return clientMapper.toDTO(findByIdClient(id));
    }

    private Client findByIdClient(int id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Cliente não encontrado"));
    }

}
