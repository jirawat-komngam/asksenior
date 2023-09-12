package com.jirawat.askseniorpostservice.Entities;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Table(value = "posts")
public class Post {
    @Id
    private UUID postID;
    private String comments;
    private String fieldID;
    private String postDescription;
    private String postTitle;
    private String userID;
    private String userName;
}
