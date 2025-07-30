package com.loan.controller;

import com.loan.model.User;
import com.loan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody User loginUser) {
    //     User dbUser = userService.getUserByUsername(loginUser.getUsername());
    //     if (dbUser == null) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    //     }

    //     if (!passwordEncoder.matches(loginUser.getPassword(), dbUser.getPassword())) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
    //     }

    //     return ResponseEntity.ok("Login successful");
    // }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User dbUser = userService.getUserByUsername(loginUser.getUsername());
        if (dbUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if (!passwordEncoder.matches(loginUser.getPassword(), dbUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // ✅ Create a response map
        Map<String, Object> response = new HashMap<>();
        response.put("id", dbUser.getId());
        response.put("username", dbUser.getUsername());

        return ResponseEntity.ok(response);
    }

    // Get user profile by ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(user);
    }

    // Update user profile by ID
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        user.setUsername(updatedUser.getUsername());
        user.setRole(updatedUser.getRole());
        user.setIncome(updatedUser.getIncome());
        // Add more fields as needed
        userService.save(user);
        return ResponseEntity.ok(user);
    }
}
