package com.jirawat.askseniorpostservice.PostControllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jirawat.askseniorpostservice.DTOs.PostDTO;
import com.jirawat.askseniorpostservice.DTOs.ResponseDTO;
import com.jirawat.askseniorpostservice.Entities.Comment;
import com.jirawat.askseniorpostservice.Entities.Post;
import com.jirawat.askseniorpostservice.PostServices.PostService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping(path = "/user/{userID}")
    public ResponseEntity<ResponseDTO<List<PostDTO>, String>> getPostByUserID(@PathVariable("userID") String userID) {
        log.info("get postByUserID controller with userID : {}", userID);
        List<PostDTO> getPostByUserID = postService.getPostByUserID(userID);
        return new ResponseEntity<>(new ResponseDTO<>(getPostByUserID, null), HttpStatus.OK);
    }

    @GetMapping(path = "/{postID}")
    public ResponseEntity<ResponseDTO<List<PostDTO>, String>> getPostByPostID(@PathVariable("postID") UUID postID) {
        log.info("get postByPostID controller with userID : {}", postID);
        List<PostDTO> newPostListExample = postService.getPostByPostID(postID);
        return new ResponseEntity<>(new ResponseDTO<>(newPostListExample, null), HttpStatus.OK);
    }

    @GetMapping(path = "/field/{fieldID}")
    public ResponseEntity<ResponseDTO<List<PostDTO>, String>> getPostByFieldID(
            @PathVariable("fieldID") String fieldID) {
        log.info("get postByUserID controller with userEmail : {}", fieldID);
        List<PostDTO> getPostByFieldID = postService.getPostByFieldID(fieldID);
        return new ResponseEntity<>(new ResponseDTO<>(getPostByFieldID, null), HttpStatus.OK);
    }

    @PostMapping(path = "/")
    public ResponseEntity<ResponseDTO<String, String>> postnewPost(@RequestBody Post newPost) {
        postService.createPost(newPost);
        return new ResponseEntity<>(new ResponseDTO<>("ok", null), HttpStatus.OK);
    }

    @PostMapping(path = "/{postID}/comment")
    public ResponseEntity<ResponseDTO<String, String>> postComment(
            @PathVariable("postID") String postID, @RequestBody Comment newComment) {
        return new ResponseEntity<>(new ResponseDTO<>("ok", null), HttpStatus.OK);
    }

}
