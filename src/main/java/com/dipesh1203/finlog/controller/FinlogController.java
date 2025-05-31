package com.dipesh1203.finlog.controller;

import com.dipesh1203.finlog.entity.Expense;
import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.ExpenseRepo;
import com.dipesh1203.finlog.repository.UserRepo;
import com.dipesh1203.finlog.service.ExpenseService;
import com.dipesh1203.finlog.service.UserService;
import com.dipesh1203.finlog.utils.AuthUtil;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/expense")
public class FinlogController {

    @Autowired
    private ExpenseRepo expenseR;
    @Autowired
    private ExpenseService expenseService;
@Autowired
private UserService userService;
    @Autowired
    private AuthUtil authUtil;

    // This api will get all the expense of user
    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAll() {
        try {
            User currentUser = authUtil.getCurrentUser();
            String userName = currentUser.getUserName();
            log.info("Expense API User found for username: {}", currentUser.getUserName());
            if (currentUser == null) {
                log.error("User not found for username: {}", userName);
                return ResponseEntity.notFound().build();
            }

            List<Expense> expenses = userService.findByUserName(userName).getExpenses();
            
            if (expenses == null) {
                log.warn("No expenses found for user: {}", userName);
                return ResponseEntity.ok(new ArrayList<>());
            }

            return ResponseEntity.ok(expenses);
            
        } catch (Exception e) {
            log.error("Error fetching expenses: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Expense> create(@RequestBody Expense e) {
        try {
            User currentUser = authUtil.getCurrentUser();
            e.setSender(currentUser);
            e.setDate(e.getDate());
            Expense saved = expenseR.save(e);
            currentUser.getExpenses().add(saved);
            userService.saveUser(currentUser);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable String id) {
        try {
            User currentUser = authUtil.getCurrentUser();
            ObjectId objectId = new ObjectId(id);
            log.info("Expense API User found for username: {}", currentUser.getUserName());
            log.info("Expense API {}",objectId);
            if(currentUser==null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Expense> expenses = currentUser.getExpenses();
            Expense res = expenseR.findById(objectId).get();
            if (res==null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            log.info("Expense API {}",res);
            if(res.getSender().getUserName().equals(currentUser.getUserName())==false){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@RequestBody Expense expense,@PathVariable String expenseId) {
        try {
            User currentUser = authUtil.getCurrentUser();
            Expense existingExpense = expenseR.findById(new ObjectId(expenseId)).get();
            existingExpense.setAmount(expense.getAmount());
            existingExpense.setDescription(expense.getDescription());
            existingExpense.setCategories(expense.getCategories());
            expenseService.saveExpense(existingExpense,currentUser.getUserName());
            return new ResponseEntity<Expense>(existingExpense, HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}