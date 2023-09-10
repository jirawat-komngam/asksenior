package com.jirawat.asksenioruserservice.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Table(value = "user")
public class User {
    @Id
    private String userID;
    private String userName;
    private String userEmail;
    private Integer userYear;
    private String fieldID;
}
