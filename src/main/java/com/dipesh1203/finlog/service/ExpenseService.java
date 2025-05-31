package com.dipesh1203.finlog.service;

import com.dipesh1203.finlog.entity.Expense;
import com.dipesh1203.finlog.entity.User;
import com.dipesh1203.finlog.repository.ExpenseRepo;
import com.dipesh1203.finlog.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ExpenseService {


    @Autowired
    private ExpenseRepo expenseR;
    @Autowired
    private UserService userService;

    @Transactional
    public void saveExpense(Expense e,String username){
        try{
            User user =  userService.findByUserName(username);
            e.setDate(LocalDateTime.now());
            Expense saved = expenseR.save(e);
            user.getExpenses().add(saved);
            user.setUserName(null);
            userService.saveUser(user);
        }
        catch(Exception error){
            System.out.println("Error: " + error.getMessage());
        }

    }
}
