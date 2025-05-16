//package com.dipesh1203.finlog.controller;
//
//import org.springframework.web.bind.annotation.*;
//import com.dipesh1203.finlog.entity.expense;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//
//@RestController
//@RequestMapping("/expense")
//public class FinlogController {
//
//    public HashMap<Long,expense> expenses = new HashMap<Long, expense>();
//
//    @GetMapping("/all")
//    public List<expense> getAll(){
//        return new ArrayList<>(expenses.values());
//    }
//
//    @PostMapping("/create")
//    public boolean create(@RequestBody expense e){
////        expenses.put(e.getId(),e);
//        return true;
//    }
//
//    @GetMapping("/{id}")
//    public expense getExpense(@PathVariable long id){
//        System.out.println("Inside getExpense");
//        return expenses.get(id);
//    }
//}
//
