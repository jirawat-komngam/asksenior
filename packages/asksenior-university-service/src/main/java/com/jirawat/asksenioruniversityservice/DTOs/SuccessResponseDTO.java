package com.jirawat.asksenioruniversityservice.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SuccessResponseDTO<T> {
    private T data;
}
