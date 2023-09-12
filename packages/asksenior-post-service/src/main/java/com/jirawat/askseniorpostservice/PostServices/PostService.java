package com.jirawat.askseniorpostservice.PostServices;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.jirawat.askseniorpostservice.DTOs.PostDTO;
import com.jirawat.askseniorpostservice.Entities.Comment;
import com.jirawat.askseniorpostservice.Entities.Post;

@Service
public class PostService {
    public List<PostDTO> getPostByPostID(UUID postID) {
        List<PostDTO> newPostListExample = new ArrayList<>();
        PostDTO newPostExample = new PostDTO();
        List<Comment> newCommentList = new ArrayList<>();
        Comment newComment = new Comment();
        newCommentList.add(newComment);
        newPostExample.setComment(newCommentList);
        newPostExample.setFieldID("wdwdwrrrrwewdsds");
        newPostExample.setPostDiscription("wewedefeefe");
        newPostExample.setPostID(postID);
        newPostExample.setPostTitle("wdwdwrrrr");
        newPostExample.setUserID("dedesdw");
        newPostListExample.add(newPostExample);
        return newPostListExample;
    }

    public List<PostDTO> getPostByFieldID(String fieldID) {
        UUID uuid = UUID.randomUUID();
        List<PostDTO> newPostListExample = new ArrayList<>();
        PostDTO newPostExample = new PostDTO();
        List<Comment> newCommentList = new ArrayList<>();
        Comment newComment = new Comment();
        newCommentList.add(newComment);
        newPostExample.setComment(newCommentList);
        newPostExample.setFieldID("wdwdwrrrrwewdsds");
        newPostExample.setPostDiscription("wewedefeefe");
        newPostExample.setPostID(uuid);
        newPostExample.setPostTitle("wdwdwrrrr");
        newPostExample.setUserID("dedesdw");
        newPostListExample.add(newPostExample);
        return newPostListExample;
    }

    public List<PostDTO> getPostByUserID(String userID) {
        UUID uuid = UUID.randomUUID();
        List<PostDTO> newPostListExample = new ArrayList<>();
        PostDTO newPostExample = new PostDTO();
        List<Comment> newCommentList = new ArrayList<>();
        Comment newComment = new Comment();
        newCommentList.add(newComment);
        newPostExample.setComment(newCommentList);
        newPostExample.setFieldID("wdwdwrrrrwewdsds");
        newPostExample.setPostDiscription("wewedefeefe");
        newPostExample.setPostID(uuid);
        newPostExample.setPostTitle("wdwdwrrrr");
        newPostExample.setUserID(userID);
        newPostListExample.add(newPostExample);
        return newPostListExample;
    }

    public void createPost(Post post) {
        System.out.println("create post");
    }

}
