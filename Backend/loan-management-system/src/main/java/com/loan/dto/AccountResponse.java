// package com.loan.dto;

// import com.fasterxml.jackson.annotation.JsonFormat;
// import java.time.LocalDate;

// public class AccountResponse {
    
//     private String accountId;
//     private String accountType;
//     private Double balance;
    
//     @JsonFormat(pattern = "yyyy-MM-dd")
//     private LocalDate startDate;
    
//     private Long userId;
//     private boolean active;
    
//     // Constructors
//     public AccountResponse() {}
    
//     public AccountResponse(String accountId, String accountType, Double balance, 
//                           LocalDate startDate, Long userId, boolean active) {
//         this.accountId = accountId;
//         this.accountType = accountType;
//         this.balance = balance;
//         this.startDate = startDate;
//         this.userId = userId;
//         this.active = active;
//     }
    
//     // Getters and Setters
//     public String getAccountId() {
//         return accountId;
//     }
    
//     public void setAccountId(String accountId) {
//         this.accountId = accountId;
//     }
    
//     public String getAccountType() {
//         return accountType;
//     }
    
//     public void setAccountType(String accountType) {
//         this.accountType = accountType;
//     }
    
//     public Double getBalance() {
//         return balance;
//     }
    
//     public void setBalance(Double balance) {
//         this.balance = balance;
//     }
    
//     public LocalDate getStartDate() {
//         return startDate;
//     }
    
//     public void setStartDate(LocalDate startDate) {
//         this.startDate = startDate;
//     }
    
//     public Long getUserId() {
//         return userId;
//     }
    
//     public void setUserId(Long userId) {
//         this.userId = userId;
//     }
    
//     public boolean isActive() {
//         return active;
//     }
    
//     public void setActive(boolean active) {
//         this.active = active;
//     }
// }