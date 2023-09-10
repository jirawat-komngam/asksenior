package com.jirawat.asksenioruserservice.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.jirawat.asksenioruserservice.DTOs.ResponseDTO;
import com.jirawat.asksenioruserservice.RequestBodyPOJOs.PostUserRequestBodyPOJO;
import com.jirawat.asksenioruserservice.Services.UserServiceServices;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/users")
public class Controller {
    @Autowired
    private UserServiceServices userService;

    @PostMapping(path = "/")
    public ResponseEntity<ResponseDTO<String, String>> postUser(
            @RequestBody PostUserRequestBodyPOJO postUserRequestBodyPOJO) {
        log.info(String.format("post user request by %s and email is %s",
                postUserRequestBodyPOJO.getUserEmail(), postUserRequestBodyPOJO.getOtp()));

        Boolean verified = userService.verifiedOTP(postUserRequestBodyPOJO.getOtp(),
                postUserRequestBodyPOJO.getUserEmail());
        log.info(String.format("verified is %s", verified));
        if (verified == true) {
            userService.upsertUser(postUserRequestBodyPOJO.getUserEmail());
            userService.signToken(postUserRequestBodyPOJO.getUserEmail());
            return new ResponseEntity<>(new ResponseDTO<>("OK", null), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResponseDTO<>(null, "otp not found"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/email/{userEmail}")
    public ResponseEntity<ResponseDTO<String, String>> getUserByEmail(@PathVariable("userEmail") String userEmail) {
        log.info(String.format("get user request by email %s", userEmail));

        Boolean validateEmail = userService.validateWhetherItIsUniversityEmail(userEmail);
        if (validateEmail == false) {
            return new ResponseEntity<>(new ResponseDTO<>(null, "not an university email"), HttpStatus.BAD_REQUEST);
        }

        userService.createOTP(userEmail);
        return new ResponseEntity<>(new ResponseDTO<>("create otp success", null), HttpStatus.CREATED);
    }
}
