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
        log.info("validateWhetherItIsUniversityEmail service by email : {}", userEmail);

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

        log.info("check UniversityWord successfully and result is : {}", checkUniversityWord);
        return checkUniversityWord;
    }

    public void createOTP(String userEmail) {
        log.info("recieve email {} and ready for create otp", userEmail);

        OTPGeneratorHelper newOTPgen = new OTPGeneratorHelper();
        String otp = newOTPgen.otpGenerate();
        log.info("create otp {} complete by user email is {}", otp, userEmail);

        String email = userEmail;
        log.info("send otp : {}  and email : {}to redis", otp, email);
        sendEmail(userEmail, otp);
    }

    public void sendEmail(String userEmail, String otp) {
        log.info("send otp : {} to email : {} success", otp, userEmail);
    }

    public void signToken(String userEmail) {
        UUID getUserID = repository.findByUserEmail(userEmail).getUserID();
        if (getUserID != null) {

        }
    }

    public void upsertUser(String userEmail) {
        log.info("upsertUser ready by userEmail {}", userEmail);

        User getUser = repository.findByUserEmail(userEmail);
        if (getUser != null) {
            log.info("userEmail {} is already used ", userEmail);
            return;
        }

        log.info("upsertUser case by userEmail {}", userEmail);

        UUID uuid = UUID.randomUUID();
        log.info("new userID is {}", uuid.toString());

        User newUser = new User();
        newUser.setUserEmail(userEmail);
        newUser.setUserID(uuid);
        repository.save(newUser);
        log.info("save successfully with id {}", uuid);
    }

    public Boolean verifiedOTP(String otp, String userEmail) {
        log.info("Verified otp with email : {}", userEmail);

        Boolean verified = false;
        Map<String, String> rediskey = new HashMap<String, String>();
        rediskey.put("123", "asdad@kmutt.com");

        String redismail = rediskey.get(otp);
        log.info("redis data is : {}", rediskey.get(otp));
        if (redismail == null) {
            return false;
        }
        if (redismail.equals(userEmail)) {
            verified = true;
        }

        log.info("verify value is {}", verified);
        return verified;
    }

    public User updateUserInformation(UUID userID, Integer userYear, String fieldID, String userName) {
        log.info("update user information by userID {} year = {} , fieldID = {} , userName = {} ", userID, userYear,
                fieldID, userName);

        User findUser = repository.findByUserID(userID);
        log.info("found user by userID {} year = {} , fieldID = {} , userName = {} ", userID, userYear,
                fieldID, userName);

        if (findUser != null) {
            findUser.setFieldID(fieldID);
            findUser.setUserYear(userYear);
            findUser.setUserName(userName);
            repository.save(findUser);
            log.info("update user complete with userID {} year = {} , fieldID = {} , userName = {} ", userID, userYear,
                    fieldID, userName);
            return findUser;
        }
        log.warn("don't found this userID in users", userID);
        return null;
    }

}
