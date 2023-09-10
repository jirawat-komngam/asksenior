package com.jirawat.asksenioruniversityservice.Repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.jirawat.asksenioruniversityservice.Entities.University;

public interface UniversityRepository
                extends CrudRepository<University, UUID> {
        List<University> findAll();

        @Query("SELECT * FROM university WHERE universityName = :universityName AND universityOrder = :universityOrder")
        List<University> customFindHaha(@Param("universityName") String universityName,
                        @Param("universityOrder") int universityOrder);

}
