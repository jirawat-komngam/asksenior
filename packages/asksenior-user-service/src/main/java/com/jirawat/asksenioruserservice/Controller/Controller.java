package com.jirawat.asksenioruserservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jirawat.asksenioruserservice.service.UserServiceServices;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/users")
public class Controller {
    @Autowired
    private UserServiceServices userService;

    @PostMapping(path = "/")
    public ResponseEntity<String> postUser(@RequestBody String otp, @RequestBody String userEmail) {
        Boolean verified = userService.verifiedOTP(otp, userEmail);
        log.info("post user request by %s", otp, "and email is %s", userEmail);
        
        if (verified == true) {
            userService.upsertUser(userEmail);
            userService.signToken(userEmail);
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(path = "/email/:")
    public ResponseEntity<String> getUserByEmail(@RequestParam String userEmail) {
        log.info("get user request by email");
        Boolean validateEmail = userService.validateWhetherItIsUniversityEmail(userEmail);
        if (validateEmail == false) {
            return new ResponseEntity<>("not an university email", HttpStatus.BAD_REQUEST);
        } else {
            userService.createOTP(userEmail);
            return new ResponseEntity<>("create otp success", HttpStatus.CREATED);
        }

    }

}
