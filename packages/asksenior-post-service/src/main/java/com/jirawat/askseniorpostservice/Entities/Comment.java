package com.jirawat.askseniorpostservice.Entities;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Comment {
    private UUID commentID;
    private Integer userYear;
    private String userID;
    private String fieldID;
    private String commentContent;
}
