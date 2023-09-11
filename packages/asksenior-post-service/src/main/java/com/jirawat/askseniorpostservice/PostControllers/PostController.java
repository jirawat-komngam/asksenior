package com.jirawat.askseniorpostservice.PostControllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/posts")
public class PostController {
    @GetMapping(path = "/user/{userEmail}")
    public String getPostByUserID(@PathVariable("userEmail") String userEmail) {
        log.info("get postByUserID controller with userEmail : {}", userEmail);
        return "test " + userEmail;
    }

}
