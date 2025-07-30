package com.loan.dto;

import com.loan.model.User;
import com.loan.model.Account;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private User user;
    private Account account;

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
}