package com.jirawat.asksenioruserservice.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jirawat.asksenioruserservice.Helpers.OTPgeneratorHelper;
import com.jirawat.asksenioruserservice.Repository.UserRepository;
import com.jirawat.asksenioruserservice.entities.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceServices {
    @Autowired
    private UserRepository repository;

    public Boolean validateWhetherItIsUniversityEmail(String userEmail) {
        log.info("validateWhetherItIsUniversityEmail service");
        Boolean checkUniversityWord = false;
        String getUserEmail = repository.findByUserEmail(userEmail).getUserEmail();
        if (getUserEmail != null) {
            log.info("get user email successfully and user email is %s", getUserEmail);
            String[] splitmail = getUserEmail.split("[. @]", 0);
            log.info("split successfully by user email is %s", getUserEmail);

            for (String eachStr : splitmail) {
                if (eachStr.equals("chula") || eachStr.equals("kmutt") || eachStr.equals("kmitl")
                        || eachStr.equals("ku")
                        || eachStr.equals("mahidol"))
                    checkUniversityWord = true;
                log.info("check email %s", getUserEmail, " complete");
            }
        }
        return checkUniversityWord;
    }

    public void createOTP(String userEmail) {
        log.info("recieve email %s", userEmail, " and ready for create otp");
        OTPgeneratorHelper newOTPgen = new OTPgeneratorHelper();
        String otp = newOTPgen.OTPgenerate();
        log.info("create otp %s%s", otp, " complete by user email is ", userEmail);
        String email = userEmail;
        log.info("send otp :%s%s", otp, " and email : ", email, "to redis");
        sendEmail(userEmail, otp);

    }

    public void sendEmail(String userEmail, String otp) {
        log.info("send otp :%s%s", otp, " to email : ", userEmail, "success");
    }

    public void signToken(String userEmail) {
        String getUserID = repository.findByUserEmail(userEmail).getUserID();
        if (getUserID != null) {

        }
    }

    public void upsertUser(String userEmail) {
        User getUser = repository.findByUserEmail(userEmail);
        if (getUser != null) {
            return;
        } else {
            User newUser = new User();
            newUser.setUserEmail(userEmail);
            repository.save(newUser);
        }
    }

    public Boolean verifiedOTP(String otp, String userEmail) {
        Boolean verified = false;
        Map<String, String> rediskey = new HashMap<String, String>();
        rediskey.put("123", "asdad@kmutt.com");
        String redismail = rediskey.get(otp);
        if (redismail.equals(userEmail)) {
            verified = true;
        }
        return verified;
    }

}
