package com.locadora.service;

import com.locadora.domain.Rent;
import com.locadora.dto.RentDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.RentMapper;
import com.locadora.repository.RentRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RentService {

    private final RentMapper rentMapper;
    private final RentRepository rentRepository;

    public RentDTO insertRent(RentDTO dto) {
        Rent rent = rentMapper.toEntity(dto);
        return rentMapper.toDTO(rentRepository.save(rent));
    }

    public List<RentDTO> getAllRent() {
        return rentMapper.toDTO(rentRepository.findAll());
    }

    public void deleteRent(int id) {
        Rent rent = findByIdRent(id);
        rentRepository.delete(rent);
    }

    public RentDTO updateRent(RentDTO dto, int id) {
        findByIdRent(id);
        Rent rent = rentMapper.toEntity(dto);
        return rentMapper.toDTO(rentRepository.save(rent));
    }

    private Rent findByIdRent(int id) {
        return rentRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Aluguel não encontrado"));
    }


}
