package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleDao {
    List<Role> getAllRoles();
    void add(Role role);
    void delete(int id);
    void edit(Role role, int id);
    Role getById(int id);
}
