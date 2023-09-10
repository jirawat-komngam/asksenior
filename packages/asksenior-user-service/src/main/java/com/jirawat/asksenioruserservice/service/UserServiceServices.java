package com.jirawat.asksenioruserservice.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jirawat.asksenioruserservice.Repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceServices {
    @Autowired
    private UserRepository repository;

    public Boolean validateWhetherItIsUniversityEmail(String userEmail) {
        log.info("validateWhetherItIsUniversityEmail service");
        String getUserEmail = repository.findByUserEmail(userEmail).getUserEmail();
        log.info("get user email successfully and user email is %s", getUserEmail);
        String[] splitmail = getUserEmail.split("[. @]", 0);
        log.info("split successfully by user email is %s", getUserEmail);
        Boolean checkUniversityWord = false;
        for (String eachStr : splitmail) {
            if (eachStr.equals("chula") || eachStr.equals("kmutt") || eachStr.equals("kmitl") || eachStr.equals("ku")
                    || eachStr.equals("mahidol"))
                checkUniversityWord = true;
            log.info("check email %s", getUserEmail, " complete");
        }
        return checkUniversityWord;
    }

    public void createOTP(String userEmail) {
        log.info("recieve email %s", userEmail, " and ready for create otp");
        String numbers = "0123456789";
        Random rndm_method = new Random();
        char[] otp = new char[6];
        for (int i = 0; i < 6; i++) {
            otp[i] = numbers.charAt(rndm_method.nextInt(numbers.length()));
        }
        log.info("create otp %s%s", String.valueOf(otp), " complete by user email is ", userEmail);
        String strotp = String.valueOf(otp);
        String Email = userEmail;
        log.info("send otp :%s%s", String.valueOf(otp), " and email : ", userEmail, "to redis");
        sendEmail(userEmail);
        log.info("send otp :%s%s", String.valueOf(otp), " to email : ", userEmail, "success");

    }

    public void sendEmail(String userEmail) {
        log.info("send email success");
    }

}
