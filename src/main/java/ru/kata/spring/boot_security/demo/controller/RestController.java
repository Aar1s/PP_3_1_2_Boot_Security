package ru.kata.spring.boot_security.demo.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/test/api")
public class RestController {
    UserService userService;

    public RestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> showAllUsers(Model model, HttpServletRequest request){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable("id") int id) {
        return userService.getById(id);
    }

    @PostMapping("/")
    public User addNewUser(@RequestBody User user) {
        //User should have no authorities and ID!
        userService.add(user);
        return user;
    }

    @PutMapping("/")
    public User editUser(@RequestBody User user) {
        userService.edit(user);
        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteUser( @PathVariable("id") int id) {
        userService.delete(id);
        return "User with ID " + id + " was deleted!";
    }
}
