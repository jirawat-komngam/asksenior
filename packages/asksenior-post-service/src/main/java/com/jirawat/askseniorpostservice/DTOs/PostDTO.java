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
    private UUID fieldID;
    private String postDescription;
    private String postTitle;
    private UUID userID;
    private String userName;
    private List<Comment> comments;
}
