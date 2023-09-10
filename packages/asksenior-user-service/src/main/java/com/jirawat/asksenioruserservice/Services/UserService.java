package com.jirawat.asksenioruserservice.Services;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jirawat.asksenioruserservice.Entities.User;
import com.jirawat.asksenioruserservice.Helpers.OTPGeneratorHelper;
import com.jirawat.asksenioruserservice.Repositories.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository repository;

    public Boolean validateWhetherItIsUniversityEmail(String userEmail) {
        log.info(String.format("validateWhetherItIsUniversityEmail service by email %s", userEmail));

        Boolean checkUniversityWord = false;
        if (userEmail != null) {
            String[] splittedMail = userEmail.split("@");
            String emailDomain = splittedMail[1];
            if (emailDomain.contains("chula") || emailDomain.contains("kmutt") || emailDomain.contains("kmitl")
                    || emailDomain.contains("ku")
                    || emailDomain.contains("mahidol")) {
                checkUniversityWord = true;
            }
        }

        log.info(String.format("check UniversityWord successfully and result is %s", checkUniversityWord));
        return checkUniversityWord;
    }

    public void createOTP(String userEmail) {
        log.info(String.format("recieve email %s and ready for create otp", userEmail));

        OTPGeneratorHelper newOTPgen = new OTPGeneratorHelper();
        String otp = newOTPgen.otpGenerate();
        log.info(String.format("create otp %s complete by user email is %s", otp, userEmail));

        String email = userEmail;
        log.info(String.format("send otp : %s  and email : %s to redis", otp, email));
        sendEmail(userEmail, otp);
    }

    public void sendEmail(String userEmail, String otp) {
        log.info(String.format("send otp : %s to email : %s success", otp, userEmail));
    }

    public void signToken(String userEmail) {
        UUID getUserID = repository.findByUserEmail(userEmail).getUserID();
        if (getUserID != null) {

        }
    }

    public void upsertUser(String userEmail) {
        log.info(String.format("upsertUser ready by userEmail %s", userEmail));

        User getUser = repository.findByUserEmail(userEmail);
        if (getUser != null) {
            log.info(String.format("upsertUser not null case by userEmail %s", userEmail));
            return;
        }

        log.info(String.format("upsertUser null case by userEmail %s", userEmail));

        UUID uuid = UUID.randomUUID();
        log.info(String.format("new userID is %s", uuid.toString()));

        User newUser = new User();
        newUser.setUserEmail(userEmail);
        newUser.setUserID(uuid);
        repository.save(newUser);
        log.info(String.format("save successfully with id %s", uuid));
    }

    public Boolean verifiedOTP(String otp, String userEmail) {
        log.info(String.format("Verified otp with email : %s", userEmail));

        Boolean verified = false;
        Map<String, String> rediskey = new HashMap<String, String>();
        rediskey.put("123", "asdad@kmutt.com");

        String redismail = rediskey.get(otp);
        log.info(String.format("redis data is : %s", rediskey.get(otp)));
        if (redismail == null) {
            return false;
        }
        if (redismail.equals(userEmail)) {
            verified = true;
        }

        log.info(String.format("verify value is %s", verified));
        return verified;
    }

}
