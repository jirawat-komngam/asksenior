package com.jirawat.asksenioruserservice.RequestBodyPOJOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUserRequestBodyPOJO {
    private String otp;
    private String userEmail;
}
