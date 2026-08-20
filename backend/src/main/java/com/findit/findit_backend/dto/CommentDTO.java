package com.findit.findit_backend.dto;

import com.findit.findit_backend.model.Comment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private Long id;
    private String text;
    private UserDTO commentedBy;

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.text = comment.getText();
        this.commentedBy = comment.getCommentedBy() != null ? new UserDTO(comment.getCommentedBy()) : null;
    }
}