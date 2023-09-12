package com.jirawat.askseniorpostservice.PostRepositories;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.jirawat.askseniorpostservice.Entities.Post;
import java.util.List;

public interface PostRepository extends CrudRepository<Post, UUID> {
    List<Post> findByFieldID(String fieldID);

    List<Post> findByUserID(String userID);

    List<Post> findByPostID(UUID postID);

}
