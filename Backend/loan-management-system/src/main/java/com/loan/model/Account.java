package com.loan.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    private long accountID;
    private Long pin;

    private String accountType;
    private double balance;
    private LocalDate startDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void setUser(User savedUser) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}
