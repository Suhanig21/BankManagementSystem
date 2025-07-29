//client

package com.loan.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private Double income;
    // private double amount;
    private String role; // ADMIN or USER
    private String customerType;
    private String govtId;
    private Long phoneNo;
    private String address;
    
}
