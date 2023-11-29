package com.locadora.service;

import com.locadora.domain.Item;
import com.locadora.dto.ItemDTO;
import com.locadora.exception.RegraNegocioException;
import com.locadora.mapper.ItemMapper;
import com.locadora.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    public ItemDTO insertItem(ItemDTO dto) {
        verifyFieldItem(dto);
        Item item = itemMapper.toEntity(dto);
        return itemMapper.toDTO(itemRepository.save(item));
    }

    public List<ItemDTO> getAllItems() {
        return itemMapper.toDTO(itemRepository.findAll());
    }

    public void deleteItem(int id) {
        Item item = findByIdItem(id);
        itemRepository.delete(item);
    }

    public ItemDTO updateItem(int id, ItemDTO dto) {
        findByIdItem(id);
        Item item = itemMapper.toEntity(dto);
        return itemMapper.toDTO(itemRepository.save(item));
    }

    public ItemDTO getByIdItem(int id) {
        Item item = findByIdItem(id);
        return itemMapper.toDTO(item);
    }

    public List<ItemDTO> findAllItemsAvailable() {
        return itemMapper.toDTO(itemRepository.findAllItemsThatNotRented());
    }

    private Item findByIdItem(int id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Item não encontrado"));
    }

    private void verifyFieldItem(ItemDTO dto) {
        if(dto.numSerie().isEmpty() || dto.numSerie().isBlank()) {
            throw new RegraNegocioException("O número de Série não pode ser vazio");
        }
    }

}
