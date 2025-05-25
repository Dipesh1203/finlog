package com.dipesh1203.finlog.entity;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "expense")
@Getter
@Setter
@NoArgsConstructor
public class Expense {
    @Id
    private ObjectId id;
    private String description;
    private double amount;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime date;
    private String category;
    @DBRef
    private User sender;
    @DBRef
    private User Receiver;
}
