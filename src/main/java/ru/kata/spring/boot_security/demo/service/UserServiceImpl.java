package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserDAO userDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, @Lazy BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDAO = userDAO;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        return userDAO.getAllUsers();
    }

    @Transactional
    @Override
    public void add(User user, String role) {
        Set<Role> roles;
        if (role.equals("ROLE_ADMIN")) {
            roles = Set.of(new Role(1L, "ROLE_USER"),new Role(2L, "ROLE_ADMIN"));
        } else {
            roles = Set.of(new Role(1L, "ROLE_USER"));
        }
        user.setRoles(roles);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userDAO.add(user);
    }

    @Transactional
    @Override
    public void delete(int id) {
        userDAO.delete(id);
    }

    @Transactional
    @Override
    public void edit(User user, int id, String role) {
        Set<Role> rolesToChange;
        if (role.equals("ROLE_ADMIN")) {
            rolesToChange = Set.of(new Role(1L, "ROLE_USER"),new Role(2L, "ROLE_ADMIN"));
        } else {
            rolesToChange = Set.of(new Role(1L, "ROLE_USER"));
        }
        user.setRoles(rolesToChange);
        userDAO.edit(user, id);
    }

    @Override
    public User getById(int id) {
        return userDAO.getById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDAO.findUserByUsername(username);
    }
}
