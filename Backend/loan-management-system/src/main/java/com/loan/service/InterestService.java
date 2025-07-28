package com.loan.service;

import com.loan.model.InterestRequest;
import com.loan.model.InterestResponse;
import org.springframework.stereotype.Service;

@Service
public class InterestService {
    public InterestResponse calculateInterest(InterestRequest request) {
        double loanAmount = request.getLoanAmount();
        double rate = request.getRate();
        double time = request.getTime();

        System.out.println("Received loanAmount: " + loanAmount + ", rate: " + rate + ", time: " + time);

        double interest = (loanAmount * rate * time) / 100;
        double totalAmount = loanAmount + interest;

        return new InterestResponse(interest, totalAmount);
    }
}
