package com.jirawat.askseniorpostservice.PostServices;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jirawat.askseniorpostservice.DTOs.PostDTO;
import com.jirawat.askseniorpostservice.Entities.Comment;
import com.jirawat.askseniorpostservice.Entities.CommentJoinPost;
import com.jirawat.askseniorpostservice.Entities.Post;
import com.jirawat.askseniorpostservice.Helpers.JsonHelper;
import com.jirawat.askseniorpostservice.Mapper.PostMapper;
import com.jirawat.askseniorpostservice.PostRepositories.PostRepository;

import lombok.var;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    private PostDTO mapPostToPostDTO(Post eachPost) throws JsonMappingException, JsonProcessingException {
        PostDTO mappedPost = PostMapper.INSTANCE.postToPostDTO(eachPost);
        CommentJoinPost commentJoinPost;
        commentJoinPost = JsonHelper.parse(eachPost.getComments(), CommentJoinPost.class);
        mappedPost.setComments(commentJoinPost.getComments());

        return mappedPost;
    }

    public PostDTO getPostByPostID(UUID postID) {
        PostDTO output = new PostDTO();
        Post getPost = postRepository.findByPostID(postID);
        if (getPost != null) {
            try {
                PostDTO mappedPost = mapPostToPostDTO(getPost);
                output.setComments(mappedPost.getComments());
                output.setFieldID(mappedPost.getFieldID());
                output.setPostDescription(mappedPost.getPostDescription());
                output.setPostID(mappedPost.getPostID());
                output.setPostTitle(mappedPost.getPostTitle());
                output.setUserID(mappedPost.getUserID());
                output.setUserName(mappedPost.getUserName());
            } catch (JsonMappingException e) {

            } catch (JsonProcessingException e) {

            }
        } else {
            return null;
        }

        return output;
    }

    public List<PostDTO> getPostByFieldID(String fieldID) {
        List<PostDTO> output = new ArrayList<>();
        List<Post> getPost = postRepository.findByFieldID(fieldID);
        for (Post eachPost : getPost) {
            try {
                var postDTO = mapPostToPostDTO(eachPost);
                output.add(postDTO);
            } catch (JsonMappingException e) {

                e.printStackTrace();
            } catch (JsonProcessingException e) {

                e.printStackTrace();
            }
        }

        return output;
    }

    public List<PostDTO> getPostByUserID(String userID) {
        List<PostDTO> output = new ArrayList<>();
        List<Post> getPost = postRepository.findByUserID(userID);
        for (Post eachPost : getPost) {
            try {
                var postDTO = mapPostToPostDTO(eachPost);
                output.add(postDTO);
            } catch (JsonMappingException e) {

                e.printStackTrace();
            } catch (JsonProcessingException e) {

                e.printStackTrace();
            }
        }

        return output;
    }

    public void createPost(Post post) {
        UUID uuid = UUID.randomUUID();
        post.setPostID(uuid);
        post.setComments("{\"comments\": []}");
        postRepository.save(post);
        System.out.println("create post");
    }

    public void createComment(UUID postID, Comment comment) {
        UUID uuid = UUID.randomUUID();
        System.out.println("create comment");
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        Post getPost = postRepository.findByPostID(postID);
        if (postID.equals(getPost.getPostID())) {
            comment.setCommentID(uuid);
            PostDTO mapGetPostToDTO;
            try {
                mapGetPostToDTO = mapPostToPostDTO(getPost);
                List<Comment> getCommentObj = mapGetPostToDTO.getComments();
                getCommentObj.add(comment);
                String commentToString = mapper.writeValueAsString(getCommentObj);
                getPost.setComments("{\"comments\":" + " " + commentToString + "}");
                postRepository.save(getPost);
                System.out.println(getPost.getComments());
            } catch (JsonMappingException e) {

                e.printStackTrace();
            } catch (JsonProcessingException e) {

                e.printStackTrace();
            }

        }

    }

}
