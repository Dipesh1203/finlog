package com.dipesh1203.finlog.service;

import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepo userR;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public boolean saveUser(User user){
        try{
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userR.save(user);
        return true;
        }catch (Exception e){
            log.error("hahahhahhahahahah");
            log.warn("hahahhahhahahahah");
            log.info("hahahhahhahahahah");
            log.debug("hahahhahhahahahah");
            log.trace("hahahhahhahahahah");
            return false;
        }
    }
    public User findByUserName(String userName){
        return userR.findByUserName(userName);
    }
}
