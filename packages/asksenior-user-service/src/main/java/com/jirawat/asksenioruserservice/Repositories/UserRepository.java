package com.jirawat.asksenioruserservice.Repositories;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.jirawat.asksenioruserservice.Entities.User;

public interface UserRepository extends CrudRepository<User, UUID> {
    User findByUserEmail(String userEmail);

    User findByUserID(UUID userID);
}
