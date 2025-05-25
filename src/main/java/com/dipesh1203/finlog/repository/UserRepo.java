package com.dipesh1203.finlog.repository;

import com.dipesh1203.finlog.entity.User;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;
import org.springframework.data.mongodb.repository.MongoRepository;

@Component
public interface UserRepo extends MongoRepository<User, ObjectId>{
    User findByUserName(String userName);
}
