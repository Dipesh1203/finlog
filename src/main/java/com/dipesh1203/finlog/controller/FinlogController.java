package com.dipesh1203.finlog.controller;

import com.dipesh1203.finlog.entity.Expense;
import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.ExpenseRepo;
import com.dipesh1203.finlog.repository.UserRepo;
import com.dipesh1203.finlog.service.ExpenseService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expense")
public class FinlogController {

    @Autowired
    private ExpenseRepo expenseR;
    @Autowired
    private ExpenseService ExpenseService;


    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAll() {
        try {
            List<Expense> res = expenseR.findAll();
            if (res == null) {
                return new ResponseEntity<List<Expense>>(new ArrayList<>(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<List<Expense>>(new ArrayList<>(), HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PostMapping("/create")
    public ResponseEntity<Expense> create(@RequestBody Expense e) {
        try {
            e.setDate(e.getDate());
            Expense saved = expenseR.save(e);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable ObjectId id) {
        try {
            Optional<Expense> res = expenseR.findById(id);
            if (res.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(res.get(), HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/expense-add/{username}")
    public ResponseEntity<Expense> getExpense(@RequestBody Expense expense,@PathVariable String username) {
        try {
            ExpenseService.saveExpense(expense,username);
            return new ResponseEntity<Expense>(expense, HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

