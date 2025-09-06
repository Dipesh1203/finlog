package com.dipesh1203.finlog.service;

import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepo userR;
    @Autowired private UserServiceImpl userService;
    @Test
    public void testAdd1() {

    }
}
