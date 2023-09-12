package com.jirawat.askseniorpostservice.PostServices;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.jirawat.askseniorpostservice.Entities.Post;

@Service
public class PostService {
    public List<Post> getPostByPostID(UUID postID) {
        List<Post> newPostListExample = new ArrayList<>();
        Post newPostExample = new Post();
        newPostExample.setComment("asdasdasdweee");
        newPostExample.setFieldID("wdwdwrrrrwewdsds");
        newPostExample.setPostDiscription("wewedefeefe");
        newPostExample.setPostID(postID);
        newPostExample.setPostTitle("wdwdwrrrr");
        newPostExample.setUserID("dedesdw");
        newPostListExample.add(newPostExample);
        return newPostListExample;
    }
}
