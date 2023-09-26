package com.jirawat.asksenioruserservice.RequestBodyPOJOs;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PutUserRequestBodyPOJO {
    private Integer userYear;
    private UUID fieldID;
    private String userName;
}
