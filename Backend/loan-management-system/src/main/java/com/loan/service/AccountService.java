package com.loan.service;
import com.loan.model.Account;
import com.loan.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService{

    @Autowired
    private AccountRepository accountRepo;
    public Account registerAccount(Account account) {
        return accountRepo.save(account);
    } 
}