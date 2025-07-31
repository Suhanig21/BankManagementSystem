package com.loan.controller;

import com.loan.model.Account;
import com.loan.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public Account registerAccount(@RequestBody Account account) {
        return accountService.registerAccount(account);
    }
}
