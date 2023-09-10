package com.jirawat.asksenioruserservice.Helpers;

import java.util.Random;

public class OTPGeneratorHelper {
    public String otpGenerate() {
        String numbers = "0123456789";
        Random randomResult = new Random();
        char[] otp = new char[6];
        for (int i = 0; i < 6; i++) {
            otp[i] = numbers.charAt(randomResult.nextInt(numbers.length()));
        }
        String strotp = String.valueOf(otp);
        return strotp;
    }
}
