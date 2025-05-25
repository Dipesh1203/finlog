package com.dipesh1203.finlog.controller;


import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.ExpenseRepo;
import com.dipesh1203.finlog.repository.UserRepo;
import jakarta.websocket.server.PathParam;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepo userR;

    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User userSaved = userR.save(user);
            return new ResponseEntity<>(userSaved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable ObjectId id) {
        try {
            Optional<User> userOpt = userR.findById(id);
            if (userOpt.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(userOpt.get(), HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/user/update/{userName}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable String userName) {
        try {
            User existingUser = userR.findByUserName(userName);

            if (existingUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Only update fields that are present
            if (user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }
            if (user.getName() != null) {
                existingUser.setName(user.getName());
            }
            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }

            // Save the updated user
            User updatedUser = userR.save(existingUser);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

