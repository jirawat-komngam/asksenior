package com.jirawat.asksenioruniversityservice.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(value = "universities")
public class University {
    @Id
    private String universityID;
    private String universityName;
    private String universityShortName;
    private int universityOrder;
    private String faculties;
}
