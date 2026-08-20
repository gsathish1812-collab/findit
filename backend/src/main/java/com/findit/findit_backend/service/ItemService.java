package com.findit.findit_backend.service;

import com.findit.findit_backend.exception.ResourceNotFoundException;
import com.findit.findit_backend.exception.UnauthorizedException;
import com.findit.findit_backend.model.Item;
import com.findit.findit_backend.model.ItemStatus;
import com.findit.findit_backend.model.User;
import com.findit.findit_backend.repository.ItemRepository;
import com.findit.findit_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public Item createItem(Item item, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));
        item.setPostedBy(user);
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
    }

    public Item updateItem(Long id, Item updatedItem, String userEmail) {
        Item existingItem = getItemById(id);
        checkOwnership(existingItem, userEmail);
        existingItem.setTitle(updatedItem.getTitle());
        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setCategory(updatedItem.getCategory());
        existingItem.setLocation(updatedItem.getLocation());
        existingItem.setStatus(updatedItem.getStatus());
        return itemRepository.save(existingItem);
    }

    public void deleteItem(Long id, String userEmail) {
        Item existingItem = getItemById(id);
        checkOwnership(existingItem, userEmail);
        itemRepository.deleteById(id);
    }

    private void checkOwnership(Item item, String userEmail) {
        if (item.getPostedBy() == null || !item.getPostedBy().getEmail().equals(userEmail)) {
            throw new UnauthorizedException("You can only modify items you posted");
        }
    }

    public Item markResolved(Long id, String userEmail) {
        Item item = getItemById(id);
        checkOwnership(item, userEmail);
        item.setStatus(ItemStatus.RESOLVED);
        return itemRepository.save(item);
    }
}