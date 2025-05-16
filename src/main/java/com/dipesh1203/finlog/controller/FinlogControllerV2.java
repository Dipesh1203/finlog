package com.dipesh1203.finlog.controller;

import com.dipesh1203.finlog.entity.expense;
import com.dipesh1203.finlog.repository.expenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expense")
public class FinlogControllerV2 {

    @Autowired
    private expenseRepo expenseR;


    @GetMapping("/all")
    public ResponseEntity<List<expense>> getAll() {
        try {
            List<expense> res = expenseR.findAll();
            if (res == null) {
                return new ResponseEntity<List<expense>>(new ArrayList<>(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<List<expense>>(new ArrayList<>(), HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PostMapping("/create")
    public ResponseEntity<expense> create(@RequestBody expense e) {
        try {
            expense saved = expenseR.save(e);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<expense> getExpense(@PathVariable String id) {
        try {
            Optional<expense> res = expenseR.findById(id);
            if (res.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(res.get(), HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

