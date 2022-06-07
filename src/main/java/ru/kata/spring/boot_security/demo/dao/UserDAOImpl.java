package ru.kata.spring.boot_security.demo.dao;
//Is it working?

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO {


    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    @SuppressWarnings("unchecked")
    public List<User> getAllUsers() {
        Query query = entityManager.createQuery("from User");
        return query.getResultList();
    }

    @Override
    public void add(User user) {
        entityManager.persist(user);
    }

    @Override
    public void delete(int id) {
        entityManager.remove(entityManager.find(User.class, id));
    }

    @Override
    public void edit(User user, int id) {
        user.setId(id);
        entityManager.merge(user);
    }

    @Override
    public User getById(int id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findUserByUsername(String usernameToFind) {
        //TypedQuery<User> query = (TypedQuery<User>) entityManager.createQuery("from User where username = (:usernameToFind)");
        //return entityManager.find(User.class, username);
        for (int i = 1; i <= getAllUsers().size(); i++) {
            User user = entityManager.find(User.class, i);
            System.out.println(user.getUsername());
            if (user.getUsername().equals(usernameToFind)) {
                return user;
            }
        }
        System.out.println("НЕ рбаотет");
        return null;
    }
}
