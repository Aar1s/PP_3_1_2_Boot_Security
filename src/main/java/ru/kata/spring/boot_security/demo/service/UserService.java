package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public interface UserService {
    public List<User> getAllUsers();
    void add(User user);
    void delete(int id);
    void edit(User user, int id);
    User getById(int id);
}
