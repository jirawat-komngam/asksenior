package com.jirawat.asksenioruserservice.Repository;

import org.springframework.data.repository.CrudRepository;

import com.jirawat.asksenioruserservice.entities.User;

public interface UserRepository extends CrudRepository<User, String> {
    User findByUserEmail(String userEmail);

}
