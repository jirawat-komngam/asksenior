package com.jirawat.askseniorpostservice.PostServices;

import java.util.ArrayList;
import java.util.List;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    private PostDTO mapPostToPostDTO(Post eachPost) throws JsonMappingException, JsonProcessingException {
        log.info("call mapPostToPostDTO service by postID: {}", eachPost.getPostID());

        PostDTO mappedPost = PostMapper.INSTANCE.postToPostDTO(eachPost);
        log.info("mapping post successfully by postID: {}", eachPost.getPostID());

        CommentJoinPost commentJoinPost = JsonHelper.parse(eachPost.getComments(), CommentJoinPost.class);
        mappedPost.setComments(commentJoinPost.getComments());
        log.info("parsing comment successfully by postID:: {}", mappedPost.getPostID());
        return mappedPost;
    }

    public PostDTO getPostByPostID(UUID postID) {
        log.info("call getPostByPostID service by postID: {}", postID);

        PostDTO output = new PostDTO();
        Post getPost = postRepository.findByPostID(postID);
        log.info("getPostByPostID successfully by postID: {}", postID);
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
                log.info("set post output successfully by postID: {}", postID);
            } catch (JsonMappingException e) {
                log.warn("failed to set post output by postID: {} with exeption {}", postID, e);
            } catch (JsonProcessingException e) {
                log.warn("failed to set post output by postID: {} with exeption {}", postID, e);
            }
        } else {
            log.warn("cannot find this post with postID: {} ", postID);
            return null;
        }
        return output;
    }

    public List<PostDTO> getPostByFieldID(String fieldID) {
        log.info("call getPostByFieldID service by fieldID: {}", fieldID);

        List<PostDTO> output = new ArrayList<>();
        List<Post> getPost = postRepository.findByFieldID(fieldID);
        log.info("getPostByfieldID successfully by fieldID: {}", fieldID);
        for (Post eachPost : getPost) {
            try {
                var postDTO = mapPostToPostDTO(eachPost);
                output.add(postDTO);
                log.info("set post output successfully by fieldID: {}", fieldID);
            } catch (JsonMappingException e) {
                log.warn("failed to set post output by fieldID: {} with exeption {}", fieldID, e);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                log.warn("failed to set post output by fieldID: {} with exeption {}", fieldID, e);
            }
        }
        return output;
    }

    public List<PostDTO> getPostByUserID(String userID) {
        log.info("call getPostByUserID service by userID: {}", userID);

        List<PostDTO> output = new ArrayList<>();
        log.info("getPostByfieldID successfully by userID: {}", userID);
        List<Post> getPost = postRepository.findByUserID(userID);
        for (Post eachPost : getPost) {
            try {
                var postDTO = mapPostToPostDTO(eachPost);
                output.add(postDTO);
                log.info("set post output successfully by userID: {}", userID);
            } catch (JsonMappingException e) {
                log.warn("failed to set post output by userID: {} with exeption {}", userID, e);

            } catch (JsonProcessingException e) {
                log.warn("failed to set post output by userID: {} with exeption {}", userID, e);
            }
        }
        return output;
    }

    public void createPost(Post post) {
        log.info("call createPost service ");

        UUID uuid = UUID.randomUUID();
        post.setPostID(uuid);
        post.setComments("{\"comments\": []}");
        postRepository.save(post);
        log.info("createPost successfully by ID: {} ", post.getPostID());

    }

    public void createComment(UUID postID, Comment comment) {
        log.info("call createPost service ");

        UUID uuid = UUID.randomUUID();
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        log.info("call cmapper and generateUUID");

        Post getPost = postRepository.findByPostID(postID);
        log.info("serchPost by ID: {} ", postID);
        if (postID.equals(getPost.getPostID())) {
            comment.setCommentID(uuid);
            PostDTO mapGetPostToDTO;
            try {
                mapGetPostToDTO = mapPostToPostDTO(getPost);
                List<Comment> getCommentObj = mapGetPostToDTO.getComments();
                getCommentObj.add(comment);
                log.info("add comment to post by commentID: {} to postID {} successfully", postID,
                        comment.getCommentID());
                String commentToString = mapper.writeValueAsString(getCommentObj);
                getPost.setComments("{\"comments\":" + " " + commentToString + "}");
                postRepository.save(getPost);
                log.info("create comment to post with by commentID: {} to postID {} successfully", postID,
                        comment.getCommentID());
            } catch (JsonMappingException e) {
                log.warn("failed to create comment to post by commentID: {} with exception ",
                        comment.getCommentID(), e);
            } catch (JsonProcessingException e) {
                log.warn("failed to create comment to post by commentID: {} with exception ",
                        comment.getCommentID(), e);
            }

        }

    }

}
