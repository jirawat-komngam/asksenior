package com.jirawat.asksenioruserservice.Helpers;

import java.util.Random;

public class OTPgeneratorHelper {
    public String OTPgenerate() {
        String numbers = "0123456789";
        Random rndm_method = new Random();
        char[] otp = new char[6];
        for (int i = 0; i < 6; i++) {
            otp[i] = numbers.charAt(rndm_method.nextInt(numbers.length()));
        }
        String strotp = String.valueOf(otp);
        return strotp;
    }
}
