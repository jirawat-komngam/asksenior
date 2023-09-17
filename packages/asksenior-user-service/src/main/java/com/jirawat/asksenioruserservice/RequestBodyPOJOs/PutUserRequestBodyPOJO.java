package com.jirawat.asksenioruserservice.RequestBodyPOJOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PutUserRequestBodyPOJO {
    private Integer userYear;
    private String fieldID;
    private String userName;
}
