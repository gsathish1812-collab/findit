package com.findit.findit_backend.controller;

import com.findit.findit_backend.dto.CommentDTO;
import com.findit.findit_backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items/{itemId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public CommentDTO addComment(@PathVariable Long itemId, @RequestBody Map<String, String> body, Authentication authentication) {
        String text = body.get("text");
        return new CommentDTO(commentService.addComment(itemId, text, authentication.getName()));
    }

    @GetMapping
    public List<CommentDTO> getComments(@PathVariable Long itemId) {
        return commentService.getCommentsForItem(itemId).stream()
                .map(CommentDTO::new)
                .collect(Collectors.toList());
    }
}