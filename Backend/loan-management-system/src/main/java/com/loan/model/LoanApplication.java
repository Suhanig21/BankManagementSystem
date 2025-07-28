package com.loan.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "loan_applications")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private Double loanAmount;
    private String purpose;
    private int creditScore;

    private String status = "PENDING";

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "document_path")
    private String documentPath;

    @PrePersist
    public void prePersist() {
        if (this.creditScore == 0) {
            // Generate a credit score between 701 and 850
            this.creditScore = (int)(Math.random() * (850 - 701 + 1)) + 701;
        }
    }

}

