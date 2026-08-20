package com.findit.findit_backend.repository;

import com.findit.findit_backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByItemId(Long itemId);
}
