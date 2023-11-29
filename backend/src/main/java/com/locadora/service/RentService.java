package com.locadora.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.locadora.domain.Rent;
import com.locadora.dto.RentDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.RentMapper;
import com.locadora.repository.RentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RentService {

    private final RentMapper rentMapper;
    private final RentRepository rentRepository;

    public RentDTO insertRent(RentDTO dto) {
        Rent rent = rentMapper.toEntity(dto);
        rent.setPaid(false);
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

    public RentDTO loadRent(int id) {
        return rentMapper.toDTO(findByIdRent(id));
    }

    public void makePayment(int id) {
        Rent rent = findByIdRent(id);
        rent.setPaid(true);
        rentRepository.save(rent);
    }

    private Rent findByIdRent(int id) {
        return rentRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Aluguel não encontrado"));
    }


}
