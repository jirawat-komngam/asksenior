package com.jirawat.askseniorpostservice.PostControllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jirawat.askseniorpostservice.DTOs.ResponseDTO;
import com.jirawat.askseniorpostservice.Entities.Post;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/posts")
public class PostController {
    @GetMapping(path = "/user/{userEmail}")
    public ResponseEntity<ResponseDTO<List<Post>, String>> getPostByUserID(@PathVariable("userEmail") String userID) {
        log.info("get postByUserID controller with userEmail : {}", userID);
        List<Post> newPostListExample = new ArrayList<>();
        Post newPostExample = new Post();
        UUID uuid = UUID.randomUUID();
        newPostExample.setComment("asdasdasdweee");
        newPostExample.setFieldID("wdwdwrrrrwewdsds");
        newPostExample.setPostDiscription("wewedefeefe");
        newPostExample.setPostID(uuid);
        newPostExample.setPostTitle("wdwdwrrrr");
        newPostExample.setUserID(userID);
        newPostListExample.add(newPostExample);
        return new ResponseEntity<>(new ResponseDTO<>(newPostListExample, null), HttpStatus.OK);
    }

    @GetMapping(path = "/field/{fieldID}")
    public ResponseEntity<ResponseDTO<List<Post>, String>> getPostByFieldID(@PathVariable("fieldID") String fieldID) {
        log.info("get postByUserID controller with userEmail : {}", fieldID);
        List<Post> newPostListExample = new ArrayList<>();
        Post newPostExample = new Post();
        UUID uuid = UUID.randomUUID();
        newPostExample.setComment("asdasdasdweee");
        newPostExample.setFieldID(fieldID);
        newPostExample.setPostDiscription("wewedefeefe");
        newPostExample.setPostID(uuid);
        newPostExample.setPostTitle("wdwdwrrrr");
        newPostExample.setUserID("12345dadwad");
        newPostListExample.add(newPostExample);
        return new ResponseEntity<>(new ResponseDTO<>(newPostListExample, null), HttpStatus.OK);
    }

}
