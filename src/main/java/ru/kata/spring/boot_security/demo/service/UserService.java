package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public interface UserService extends UserDetailsService {
    List<User> getAllUsers();
    void add(User user, String role);
    void delete(int id);
    void edit(User user, int id, String role);
    User getById(int id);
}
