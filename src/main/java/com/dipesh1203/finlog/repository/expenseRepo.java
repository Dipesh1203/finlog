package com.dipesh1203.finlog.repository;

import com.dipesh1203.finlog.entity.expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface expenseRepo extends MongoRepository<expense, String> {
}
