// package com.loan.dto;

// import com.fasterxml.jackson.annotation.JsonFormat;

// import javax.validation.Valid;
// import javax.validation.constraints.*;

// import org.springframework.boot.context.properties.ConfigurationProperties;
// import org.springframework.stereotype.Component;
// import org.springframework.validation.annotation.Validated;

// import java.time.LocalDate;

// import jakarta.validation.Valid;
// import jakarta.validation.constraints.DecimalMin;
// import jakarta.validation.constraints.Max;
// import jakarta.validation.constraints.Min;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;
// import jakarta.validation.constraints.Pattern;

// @Component
// @ConfigurationProperties
// @Validated
// public class AccountRequest {
    
//     private String accountId; // Optional - can be auto-generated
    
//     // @NotBlank(message = "Account type is required")
//     @Pattern(regexp = "SAVINGS|CHECKING|BUSINESS", message = "Account type must be SAVINGS, CHECKING, or BUSINESS")
//     private String accountType;
    
//     // @NotNull(message = "PIN is required")
//     @Min(value = 1000, message = "PIN must be at least 4 digits")
//     @Max(value = 999999, message = "PIN must be at most 6 digits")
//     private Integer pin;
    
//     // @NotNull(message = "Balance is required")
//     @DecimalMin(value = "0.0", message = "Balance cannot be negative")
//     private Double balance;
    
//     // @NotNull(message = "Start date is required")
//     @JsonFormat(pattern = "yyyy-MM-dd")
//     private LocalDate startDate;
    
//     @Valid
//     // @NotNull(message = "User information is required")
//     private UserInfo user;
    
//     // Constructors
//     public AccountRequest() {}
    
//     public AccountRequest(String accountId, String accountType, Integer pin, 
//                          Double balance, LocalDate startDate, UserInfo user) {
//         this.accountId = accountId;
//         this.accountType = accountType;
//         this.pin = pin;
//         this.balance = balance;
//         this.startDate = startDate;
//         this.user = user;
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
    
//     public Integer getPin() {
//         return pin;
//     }
    
//     public void setPin(Integer pin) {
//         this.pin = pin;
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
    
//     public UserInfo getUser() {
//         return user;
//     }
    
//     public void setUser(UserInfo user) {
//         this.user = user;
//     }
    
//     // Inner class for user info
//     public static class UserInfo {
//         // @NotNull(message = "User ID is required")
//         @Min(value = 1, message = "User ID must be positive")
//         private Long id;
        
//         public UserInfo() {}
        
//         public UserInfo(Long id) {
//             this.id = id;
//         }
        
//         public Long getId() {
//             return id;
//         }
        
//         public void setId(Long id) {
//             this.id = id;
//         }
//     }
// }