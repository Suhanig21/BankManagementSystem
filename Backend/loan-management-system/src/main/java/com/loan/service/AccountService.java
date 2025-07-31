package com.loan.service;
import com.loan.model.Account;
import com.loan.model.User;
import com.loan.repository.AccountRepository;
import com.loan.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private UserRepository userRepository;

    public Account registerAccount(Account account) {
        Long userId = account.getUser().getId(); // or however you're sending userId

        // Fetch user from DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set the user in the account
        account.setUser(user);

        // Save the account
        return accountRepo.save(account);
    }
}
