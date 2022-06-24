package ru.kata.spring.boot_security.demo.model;


import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;


@Data
@Entity
@Table(name = "Users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotEmpty(message = "Name should not be empty")
    @Size(min=1, max=30, message = "Name should be from 1 to 30 characters")
    private String name;

    @NotEmpty(message = "Surname should not be empty")
    @Size(min=1, max=30, message = "Surname should be from 1 to 30 characters")
    private String surname;

    @Min(value = 0, message = "User's Age should be more than 0!")
    private int age;

    @ManyToMany (cascade = {
            CascadeType.MERGE
    })
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id")
    )
    private Set<Role> roles;

    @NotEmpty(message = "Email should not be empty!")
    private String username;
    @NotEmpty(message = "Password should not be empty!")
    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = (result*PRIME) + (this.getName() == null ? 43 : this.getName().hashCode());
        result = (result*PRIME) + this.getAge();
        result = (result*PRIME) + this.getId();
        result = (result*PRIME) + (this.getSurname() == null ? 43 : this.getSurname().hashCode());
        result = (result*PRIME) + (this.getUsername() == null ? 43 : this.getUsername().hashCode());
        for ( Role role : this.getRoles()) {
            result = (result*PRIME) + role.getName().hashCode() >>> 5;
        }
        return result;
    }

    @Override public boolean equals(Object o) {
        if (this.hashCode() != o.hashCode()) {
            return false;
        }
        if (o == this) {
            return true;
        }
        if (this.getId() != ((User) o).getId()) {
            return false;
        }
        if (this.getRoles() != ((User) o).getRoles()) {
            return false;
        }
        if (this.getAge() != ((User) o).getAge()) {
            return false;
        }
        if (!this.getName().equals(((User)o).getName())) {
            return false;
        }
        if (!this.getSurname().equals(((User)o).getSurname())) {
            return false;
        }
        if (!this.getUsername().equals(((User)o).getUsername())) {
            return false;
        }
        if (!this.getPassword().equals(((User)o).getPassword())) {
            return false;
        }
        return true;
    }
}