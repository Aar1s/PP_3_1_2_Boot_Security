package ru.kata.spring.boot_security.demo.controller;

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
@RequestMapping("/admin/users")

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
        model.addAttribute("user", userService.getById(id));
        return "users/showAdmin";
    }

    @GetMapping("/new")
    public String newUser(@ModelAttribute("newU") User newU, Model model) {
        return "users/new";
    }

    @PostMapping()
    public String create(@ModelAttribute("newU") @Valid User newU,  @ModelAttribute("role") String role, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println("Error occurred!");
            return "users/new";
        }
        Set<Role> roles;
        if (role.equals("ROLE_ADMIN")) {
            roles = Set.of(new Role(1L, "ROLE_USER"),new Role(2L, "ROLE_ADMIN"));
        } else {
            roles = Set.of(new Role(1L, "ROLE_USER"));
        }
        newU.setRoles(roles);
        userService.add(newU);

        return "redirect:/admin/users/";
    }

    @GetMapping("/{id}/edit")
    public String edit(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.getById(id));
        return "users/edit";
    }


    @PatchMapping ("/{id}")
    public String update(@ModelAttribute("user") @Valid User user,
                         BindingResult bindingResult, @PathVariable int id) {
        if (bindingResult.hasErrors()) {
            return "users/edit";
        }
        userService.edit(user, id);
        return "redirect:/admin/users/";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin/users/";
    }
}
