package com.findit.findit_backend.service;

import com.findit.findit_backend.exception.ResourceNotFoundException;
import com.findit.findit_backend.model.Comment;
import com.findit.findit_backend.model.Item;
import com.findit.findit_backend.model.User;
import com.findit.findit_backend.repository.CommentRepository;
import com.findit.findit_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserRepository userRepository;

    public Comment addComment(Long itemId, String text, String userEmail) {
        Item item = itemService.getItemById(itemId);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Comment comment = new Comment();
        comment.setText(text);
        comment.setItem(item);
        comment.setCommentedBy(user);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsForItem(Long itemId) {
        return commentRepository.findByItemId(itemId);
    }
}
