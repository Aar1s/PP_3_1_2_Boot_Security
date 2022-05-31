package ru.kata.spring.boot_security.demo.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


@Data
@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotEmpty(message = "Name should not be empty")
    @Size(min=1, max=30, message = "Name should be from 1 to 30 characters")
    private String name;

    @NotEmpty(message = "Surname should not be empty")
    @Size(min=1, max=30, message = "Surname should be from 1 to 30 characters")
    private String surname;

    @Min(value = 0, message = "User's Age should be more than 0!")
    private int age;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public User() {}

    public User(String name, String surname, int age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}