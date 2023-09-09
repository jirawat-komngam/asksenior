package com.jirawat.asksenioruniversityservice.Mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.jirawat.asksenioruniversityservice.DTOs.UniversityDTO;
import com.jirawat.asksenioruniversityservice.Entities.University;

@Mapper
public interface UniversityMapper {

    UniversityMapper INSTANCE = Mappers.getMapper(UniversityMapper.class);

    @Mapping(target = "faculties", expression = "java(null)")
    UniversityDTO universityToUniversityDTO(University car);
}