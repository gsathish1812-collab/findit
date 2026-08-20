package com.findit.findit_backend.controller;

import com.findit.findit_backend.dto.ItemDTO;
import com.findit.findit_backend.model.Item;
import com.findit.findit_backend.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ItemDTO createItem(@Valid @RequestBody Item item, Authentication authentication) {
        String email = authentication.getName();
        Item saved = itemService.createItem(item, email);
        return new ItemDTO(saved);
    }

    @GetMapping
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems().stream()
                .map(ItemDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ItemDTO getItemById(@PathVariable Long id) {
        return new ItemDTO(itemService.getItemById(id));
    }

    @PutMapping("/{id}")
    public ItemDTO updateItem(@PathVariable Long id, @RequestBody Item item, Authentication authentication) {
        return new ItemDTO(itemService.updateItem(id, item, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id, Authentication authentication) {
        itemService.deleteItem(id, authentication.getName());
    }

    @PatchMapping("/{id}/resolve")
    public ItemDTO markResolved(@PathVariable Long id, Authentication authentication) {
        return new ItemDTO(itemService.markResolved(id, authentication.getName()));
    }
}