package com.jirawat.asksenioruniversityservice.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.jirawat.asksenioruniversityservice.DTOs.UniversityDTO;
import com.jirawat.asksenioruniversityservice.Entities.FacultyInsideUniversity;
import com.jirawat.asksenioruniversityservice.Entities.University;
import com.jirawat.asksenioruniversityservice.Helpers.JsonHelper;
import com.jirawat.asksenioruniversityservice.Mappers.UniversityMapper;
import com.jirawat.asksenioruniversityservice.Repositories.UniversityRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UniversityService {

    @Autowired
    private UniversityRepository repository;

    public List<UniversityDTO> getUniversities() {
        log.info("getUniversities service");
        List<UniversityDTO> output = new ArrayList<>();

        log.info("call findAll from university repository");
        var universities = repository.findAll();
        for (University eachUniversity : universities) {
            try {
                log.info(String.format("try to map university id %s", eachUniversity.getUniversityID()));
                var universityDTO = mapEachUniversityToUniversityDTO(eachUniversity);

                log.info(String.format("add mapped university id %s to output", eachUniversity.getUniversityID()));
                output.add(universityDTO);
            } catch (Exception exception) {
                log.warn(String.format("there is a mapping error on university id %s",
                        eachUniversity.getUniversityID()));
                log.warn("error details", exception);
                continue;
            }
        }

        log.info("getUniversities service success");
        return output;
    }

    private UniversityDTO mapEachUniversityToUniversityDTO(University eachUniversity)
            throws JsonMappingException, JsonProcessingException {
        log.info(String.format("mapping university id %s", eachUniversity.getUniversityID()));
        UniversityDTO mappedUniversity = UniversityMapper.INSTANCE.universityToUniversityDTO(eachUniversity);

        log.info(String.format("mapping new faculty for university id %s", eachUniversity.getUniversityID()));
        FacultyInsideUniversity facultyInsideUniversity = JsonHelper.parse(eachUniversity.getFaculties(),
                FacultyInsideUniversity.class);
        mappedUniversity.setFaculties(facultyInsideUniversity.getData());

        return mappedUniversity;
    }
}
