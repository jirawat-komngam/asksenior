package com.jirawat.asksenioruserservice.Services;

import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jirawat.asksenioruserservice.DTOs.JWTBodyDTO;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JWTService {
    @Value("${tokenValidityInSeconds}")
    private long tokenValidityInSeconds;

    @Value("${secret}")
    private String secret;

    public String generateJwtToken(JWTBodyDTO jwtBodyDTO) throws JsonProcessingException {
        log.info("create claim object for user ID {}", jwtBodyDTO.getUserID());
        var claims = new HashMap<String, Object>();
        claims.put("payload", jwtBodyDTO);

        log.info("generate JWT token for user ID {}", jwtBodyDTO.getUserID());
        var token = Jwts.builder().setClaims(claims).setSubject(jwtBodyDTO.getUserEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenValidityInSeconds * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();

        log.info("generate JWT token for user ID {} success", jwtBodyDTO.getUserID());
        return token;
    }
}
