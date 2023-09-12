package com.jirawat.askseniorpostservice.PostServices;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
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
        CommentJoinPost commentJoinPost = JsonHelper.parse(eachPost.getComments(), CommentJoinPost.class);
        mappedPost.setComments(commentJoinPost.getComments());
        return mappedPost;
    }

    public List<PostDTO> getPostByPostID(UUID postID) {
        List<PostDTO> output = new ArrayList<>();
        List<Post> getPost = postRepository.findByPostID(postID);
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
        post.setComments("{\"comments\": []}");
        postRepository.save(post);
        System.out.println("create post");
    }

}
