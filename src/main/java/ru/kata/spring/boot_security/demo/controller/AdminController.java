package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.http.HttpRequest;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/admin")

public class AdminController {


    UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String index(Model model, HttpServletRequest request) {
        List<User> allUsers = userService.getAllUsers();
        model.addAttribute("allUsers", allUsers);
        model.addAttribute("activeUser", userService.loadUserByUsername(request.getRemoteUser()));
        model.addAttribute("newU", new User());
        model.addAttribute("test", "teasdasdst");
        return "users/index";
    }

    @GetMapping("/{id}")
    public String show(@PathVariable("id") int id, Model model) {
        model.addAttribute("getUser", userService.getById(id));
        return "users/index";
    }

    @GetMapping("/new")
    public String newUser(@ModelAttribute("newU") User newU, Model model) {
        return "users/new";
    }

    @PostMapping()
    public String create(@ModelAttribute("newU") @Valid User newU,  @ModelAttribute("role") String role,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println("Error occurred!");
            return "users/new";
        }

        userService.add(newU, role);
        return "redirect:/admin/";
    }

    @GetMapping("/{id}/edit")
    public String edit(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.getById(id));
        return "users/edit";
    }


    @PatchMapping ("/{id}")
    public String update(@ModelAttribute("user") @Valid User user, @ModelAttribute("role") String role,
                         BindingResult bindingResult, @PathVariable int id) {
        if (bindingResult.hasErrors()) {
            System.out.println(bindingResult.getModel());
            return "users/edit";
        }
        userService.edit(user, id, role);
        return "redirect:/admin/";
    }

    @PostMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin/";
    }
}
