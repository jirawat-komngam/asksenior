package com.jirawat.askseniorpostservice.PostControllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jirawat.askseniorpostservice.DTOs.ResponseDTO;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/posts")
public class PostController {
    @GetMapping(path = "/user/{userEmail}")
    public ResponseEntity<ResponseDTO<String, String>> getPostByUserID(@PathVariable("userEmail") String userEmail) {
        log.info("get postByUserID controller with userEmail : {}", userEmail);
        return new ResponseEntity<>(new ResponseDTO<>("OK", null), HttpStatus.OK);
    }

}
