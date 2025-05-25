package com.dipesh1203.finlog.service;

import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userR;

    public void saveUser(User user){
        userR.save(user);
    }
    public User findByUserName(String userName){
        return userR.findByUserName(userName);
    }
}
