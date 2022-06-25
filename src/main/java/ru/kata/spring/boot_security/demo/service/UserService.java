package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public interface UserService extends UserDetailsService {
    List<User> getAllUsers();
    void addOld(User user, String role);

    void add(User user);

    void delete(int id);
    void editOld(User user, int id, String role);
    void edit(User user);
    User getById(int id);
}
