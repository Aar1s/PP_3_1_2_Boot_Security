package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/test/api")
public class RestController {
    UserService userService;

    public RestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/activeUser")
    public UserDetails getActiveUser(Principal principal) {
        System.out.println(principal);
        System.out.println(userService.loadUserByUsername(principal.getName()));
        return (User) userService.loadUserByUsername(principal.getName());
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> showAllUsers(Model model, HttpServletRequest request){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") int id) {
        return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
    }


    @PostMapping("/")
    public User addNewUser(@RequestBody User user) {
        //User should have no authorities and ID!
        userService.add(user);
        return user;
    }

    @PutMapping("/")
    public User editUser(@RequestBody User user) {
        System.out.println(user);
        userService.edit(user);
        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteUser( @PathVariable("id") int id) {
        userService.delete(id);
        return "User with ID " + id + " was deleted!";
    }
}
