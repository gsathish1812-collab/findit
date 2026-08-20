package com.findit.findit_backend.dto;

import com.findit.findit_backend.model.Item;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class ItemDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String location;
    private String status;
    private UserDTO postedBy;
    private LocalDateTime createdAt;

    public ItemDTO(Item item) {
        this.id = item.getId();
        this.title = item.getTitle();
        this.description = item.getDescription();
        this.category = item.getCategory();
        this.location = item.getLocation();
        this.status = item.getStatus() != null ? item.getStatus().name() : null;
        this.postedBy = item.getPostedBy() != null ? new UserDTO(item.getPostedBy()) : null;
        this.createdAt = item.getCreatedAt();
    }
}