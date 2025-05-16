package com.dipesh1203.finlog.service;

import com.dipesh1203.finlog.entity.expense;
import com.dipesh1203.finlog.repository.expenseRepo;
import org.springframework.beans.factory.annotation.Autowired;

public class expenseService {


    @Autowired
    private expenseRepo expenseR;

    public void saveExpense(expense e){
        expenseR.save(e);
    }
}
