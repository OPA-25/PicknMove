

package com.InstantLoad.PicknMove.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.InstantLoad.PicknMove.model.Role;
import com.InstantLoad.PicknMove.model.User;
import com.InstantLoad.PicknMove.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

//    public User register(User user) {
//
//        if (userRepository.existsByEmail(user.getEmail())) {
//            throw new RuntimeException("Email already registered");
//        }
//
//        // Force default role
//        user.setRole(Role.CUSTOMER);
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }
    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // ✅ DO NOT FORCE CUSTOMER
        // Use role coming from frontend
        if (user.getRole() == null) {
            user.setRole(Role.CUSTOMER); // default only if not provided
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
}