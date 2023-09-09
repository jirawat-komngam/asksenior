package com.jirawat.asksenioruniversityservice.DTOs;

import java.util.List;

import com.jirawat.asksenioruniversityservice.Entities.Faculty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UniversityDTO {
    private String universityID;
    private String universityName;
    private String universityShortName;
    private int universityOrder;
    private List<Faculty> faculties;
}
