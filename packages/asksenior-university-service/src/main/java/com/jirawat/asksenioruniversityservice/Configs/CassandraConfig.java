package com.jirawat.asksenioruniversityservice.Configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

@Configuration
@EnableCassandraRepositories
class ApplicationConfig extends AbstractCassandraConfiguration {

    @Override
    public String getContactPoints() {
        return "cassandra";
    }

    @Override
    protected String getKeyspaceName() {
        return "asksenior_university_service";
    }
}
