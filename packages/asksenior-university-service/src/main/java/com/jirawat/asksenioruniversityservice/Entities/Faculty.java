package com.jirawat.asksenioruniversityservice.Entities;

import java.util.List;

import lombok.Getter;

@Getter
public class Faculty {
    private String facultyID;
    private String facultyName;
    private List<Field> fields;
}
