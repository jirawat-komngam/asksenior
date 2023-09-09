package com.jirawat.asksenioruniversityservice.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.jirawat.asksenioruniversityservice.DTOs.SuccessResponseDTO;
import com.jirawat.asksenioruniversityservice.DTOs.UniversityDTO;
import com.jirawat.asksenioruniversityservice.Services.UniversityService;

@RestController
@RequestMapping(path = "api/v1/universities")
public class UniversityController {
    @Autowired
    private UniversityService universityService;

    @GetMapping
    public SuccessResponseDTO<List<UniversityDTO>> getUniversities()
            throws JsonMappingException, JsonProcessingException {
        return new SuccessResponseDTO<>(universityService.getUniversities());
    }
}
