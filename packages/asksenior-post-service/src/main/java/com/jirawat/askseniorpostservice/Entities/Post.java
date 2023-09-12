package com.jirawat.askseniorpostservice.Entities;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Table(value = "posts")
public class Post {
    private UUID postID;
    private String comment;
    private UUID fieldID;
    private String postDiscription;
    private String postTitle;
    private UUID userID;
    private String userName;
}
