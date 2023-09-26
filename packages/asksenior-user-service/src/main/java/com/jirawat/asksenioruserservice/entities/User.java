package com.jirawat.asksenioruserservice.Entities;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Table(value = "users")
public class User {
    @Id
    private UUID userID;
    private String userName;
    private String userEmail;
    private Integer userYear;
    private UUID fieldID;
}
