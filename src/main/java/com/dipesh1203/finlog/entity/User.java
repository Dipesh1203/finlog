package com.dipesh1203.finlog.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")
@Getter
@Setter
public class User {
    @Id
    public ObjectId id;
    @Indexed(unique = true)
    @NonNull
    private String userName;
    @NonNull
    private String name;
    @NonNull
    private String email;
    @NonNull
    private String password;
    private String role;
    @DBRef
    private List<Expense> expenses=new ArrayList<>();
}
