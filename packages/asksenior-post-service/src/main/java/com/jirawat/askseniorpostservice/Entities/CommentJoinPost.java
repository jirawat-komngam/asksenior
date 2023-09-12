package com.jirawat.askseniorpostservice.Entities;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentJoinPost {
    private List<Comment> comments;
}
