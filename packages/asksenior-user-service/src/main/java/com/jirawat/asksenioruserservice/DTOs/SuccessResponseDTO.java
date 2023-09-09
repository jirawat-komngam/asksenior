package com.jirawat.asksenioruserservice.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SuccessResponseDTO<T> {
    private T data;
}
