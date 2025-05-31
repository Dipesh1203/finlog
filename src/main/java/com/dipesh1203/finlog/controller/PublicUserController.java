package com.dipesh1203.finlog.controller;

import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.UserRepo;
import com.dipesh1203.finlog.service.UserService;
import com.dipesh1203.finlog.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.Option;
import java.util.Optional;
@Slf4j
@RestController
@RequestMapping("/public/user")
public class PublicUserController {
    @Autowired
    private UserRepo userR;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/sign-up")
    public ResponseEntity<Boolean> signup(@RequestBody User user) {
        try {
            if(user.getRole()==null){
                user.setRole("USER");
            }
            boolean isSaved = userService.saveUser(user);
            return new ResponseEntity<>(isSaved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        try{
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
            UserDetails userDetail = userDetailsService.loadUserByUsername(user.getUserName());
            String token = jwtUtil.generateToken(userDetail.getUsername());
            return new ResponseEntity<>(token,HttpStatus.OK);
        }catch(Exception e){
            log.error("Error: "+e.getMessage());
            return new ResponseEntity<>( "",HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
