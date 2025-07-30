package com.loan.controller;

import com.loan.dto.RegisterRequest;
import com.loan.model.Account;
import com.loan.model.User;
import com.loan.service.AccountService;
import com.loan.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

import com.loan.repository.AccountRepository;
import com.loan.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;
    private AccountService accountService;
    private AccountRepository accountRepository;
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
    User user = registerRequest.getUser();
    Account account = registerRequest.getAccount();

    // Save user first
    User savedUser = userRepository.save(user);

    // Link the user to account
    account.setUser(savedUser);

    // Save account
    accountRepository.save(account);

    return ResponseEntity.ok("User and Account registered successfully!");
}


    @PostMapping("/custregister")
    public User custRegister(@RequestBody User user) {
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


}
