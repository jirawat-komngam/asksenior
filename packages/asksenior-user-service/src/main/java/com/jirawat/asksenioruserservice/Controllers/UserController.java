package com.jirawat.asksenioruserservice.Controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jirawat.asksenioruserservice.DTOs.ResponseDTO;
import com.jirawat.asksenioruserservice.Entities.User;
import com.jirawat.asksenioruserservice.RequestBodyPOJOs.PostUserRequestBodyPOJO;
import com.jirawat.asksenioruserservice.RequestBodyPOJOs.PutUserRequestBodyPOJO;
import com.jirawat.asksenioruserservice.Services.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/")
    public ResponseEntity<ResponseDTO<String, String>> postUser(
            @RequestBody PostUserRequestBodyPOJO postUserRequestBodyPOJO) {
        log.info("post user request by : {} and otp is : {}",
                postUserRequestBodyPOJO.getUserEmail(), postUserRequestBodyPOJO.getOtp());

        Boolean verified = userService.verifiedOTP(postUserRequestBodyPOJO.getOtp(),
                postUserRequestBodyPOJO.getUserEmail());
        log.info("verified is : {}", verified);
        if (verified == true) {
            userService.upsertUser(postUserRequestBodyPOJO.getUserEmail());
            try {
                var jwtToken = userService.signToken(postUserRequestBodyPOJO.getUserEmail());
                return new ResponseEntity<>(new ResponseDTO<>(jwtToken, null),
                        HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(new ResponseDTO<>(null, e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(new ResponseDTO<>(null, "invalid otp"),
                HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/email/{userEmail}")
    public ResponseEntity<ResponseDTO<String, String>> getUserByEmail(@PathVariable("userEmail") String userEmail) {
        log.info("get user request by email : {}", userEmail);

        Boolean validateEmail = userService.validateWhetherItIsUniversityEmail(userEmail);
        if (validateEmail == false) {
            return new ResponseEntity<>(new ResponseDTO<>(null, "not an university email"), HttpStatus.BAD_REQUEST);
        }

        userService.createOTP(userEmail);
        return new ResponseEntity<>(new ResponseDTO<>("create otp success", null), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{userID}")
    public ResponseEntity<ResponseDTO<String, String>> updateUserInformation(@PathVariable("userID") UUID userID,
            @RequestBody PutUserRequestBodyPOJO putUserRequestBodyPOJO) {
        log.info("put user request by : {} and value is name = {} year = {} fieldID = {}", userID,
                putUserRequestBodyPOJO.getUserName(), putUserRequestBodyPOJO.getUserYear(),
                putUserRequestBodyPOJO.getFieldID());

        User getUser = userService.updateUserInformation(userID, putUserRequestBodyPOJO.getUserYear(),
                putUserRequestBodyPOJO.getFieldID(), putUserRequestBodyPOJO.getUserName());
        if (getUser != null) {
            return new ResponseEntity<>(new ResponseDTO<>("update user success", null), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResponseDTO<>(null, "don't found userID "), HttpStatus.BAD_REQUEST);

    }
}
