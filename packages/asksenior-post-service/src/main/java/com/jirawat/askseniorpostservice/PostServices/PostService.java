package com.jirawat.askseniorpostservice.PostServices;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.jirawat.askseniorpostservice.DTOs.PostDTO;
import com.jirawat.askseniorpostservice.Entities.Comment;
import com.jirawat.askseniorpostservice.Entities.CommentJoinPost;
import com.jirawat.askseniorpostservice.Entities.Post;
import com.jirawat.askseniorpostservice.Helpers.JsonHelper;
import com.jirawat.askseniorpostservice.Mapper.PostMapper;

@Service
public class PostService {

    private PostDTO mapPostToPostDTO(Post eachPost) throws JsonMappingException, JsonProcessingException {
        PostDTO mappedPost = PostMapper.INSTANCE.universityToUniversityDTO(eachPost);
        CommentJoinPost commentJoinPost = JsonHelper.parse(eachPost.getComment(), CommentJoinPost.class);
        mappedPost.setComments(commentJoinPost.getComments());
        return mappedPost;
    }

    public List<PostDTO> getPostByPostID(UUID postID) {
        List<PostDTO> newPostListExample = new ArrayList<>();
        PostDTO newPostExample = new PostDTO();
        List<Comment> newCommentList = new ArrayList<>();
        Comment newComment = new Comment();
        newCommentList.add(newComment);
        newPostExample.setComments(newCommentList);
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
        newPostExample.setComments(newCommentList);
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
        newPostExample.setComments(newCommentList);
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
