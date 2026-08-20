package com.findit.findit_backend.repository;

import com.findit.findit_backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStatus(String status);
    List<Item> findByCategory(String category);
}