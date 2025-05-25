package com.dipesh1203.finlog.repository;

import com.dipesh1203.finlog.entity.Expense;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface ExpenseRepo extends MongoRepository<Expense, ObjectId> {
}
