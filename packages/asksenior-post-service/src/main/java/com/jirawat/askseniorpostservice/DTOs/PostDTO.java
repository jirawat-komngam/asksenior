package com.jirawat.askseniorpostservice.DTOs;

import java.util.List;
import java.util.UUID;

import com.jirawat.askseniorpostservice.Entities.Comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDTO {
    private UUID postID;
    private String fieldID;
    private String postDiscription;
    private String postTitle;
    private String userID;
    private String userName;
    private List<Comment> comments;
}
