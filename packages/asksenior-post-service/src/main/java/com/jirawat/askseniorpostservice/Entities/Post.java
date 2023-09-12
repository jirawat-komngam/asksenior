package com.jirawat.askseniorpostservice.Entities;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Post {
    private UUID postID;
    private String comment;
    private String fieldID;
    private String postDiscription;
    private String postTitle;
    private String userID;
    private String userName;
}
