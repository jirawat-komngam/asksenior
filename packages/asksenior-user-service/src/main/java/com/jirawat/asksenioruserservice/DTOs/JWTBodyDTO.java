package com.jirawat.asksenioruserservice.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JWTBodyDTO {
    private String userID;
    private String userEmail;
}
