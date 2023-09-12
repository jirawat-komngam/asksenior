package com.jirawat.askseniorpostservice.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.jirawat.askseniorpostservice.DTOs.PostDTO;
import com.jirawat.askseniorpostservice.Entities.Post;

@Mapper
public interface PostMapper {

    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    @Mapping(target = "comments", expression = "java(null)")
    PostDTO universityToUniversityDTO(Post post);
}
