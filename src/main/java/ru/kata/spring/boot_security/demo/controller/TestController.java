package ru.kata.spring.boot_security.demo.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/test/api")
public class TestController {
    UserService userService;

    public TestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> showAllUsers(Model model, HttpServletRequest request){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable("id") int id) {
        return userService.getById(id);
    }
    @PostMapping("/")
    public User addNewUser(@RequestBody User user) {
        userService.add(user, "ROLE_ADMIN");
        return user;
    }
}
