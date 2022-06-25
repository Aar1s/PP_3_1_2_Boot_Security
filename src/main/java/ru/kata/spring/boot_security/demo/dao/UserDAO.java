package ru.kata.spring.boot_security.demo.dao;



import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDAO {
    List<User> getAllUsers();
    void add(User user);
    void delete(int id);
    void editOld(User user, int id);
    void edit(User user);
    User getById(int id);

    User findUserByUsername(String username);
}
