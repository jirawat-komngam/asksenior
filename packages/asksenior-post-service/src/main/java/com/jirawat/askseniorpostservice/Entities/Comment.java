package com.jirawat.askseniorpostservice.Entities;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Comment {
    private UUID commentID;
    private Integer userYear;
    private String userID;
    private String fieldID;
    private String commentContent;
}
