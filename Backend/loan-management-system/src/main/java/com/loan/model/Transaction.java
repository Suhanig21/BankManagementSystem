package com.loan.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private String transactionType;

    @Column(nullable = false)
    private Long customerId;

    private Long toAccountId;

    private Long fromAccountId;

    @Column(nullable = false)
    private Double amount;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @PrePersist
    public void prePersist() {
        if (this.transactionDate == null) {
            this.transactionDate = LocalDateTime.now();
        }
    }
}