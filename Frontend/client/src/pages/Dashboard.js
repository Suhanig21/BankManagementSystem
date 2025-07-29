// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-speedometer2 me-2"></i>User Dashboard
              </h2>
            </div>
            <div className="card-body p-4">
              <div className="d-grid gap-3">
                <Link to="/apply-loan" className="btn btn-primary py-2 fw-semibold">
                  <i className="bi bi-currency-exchange me-2"></i>Apply for Loan
                </Link>
                <Link to="/loan-list" className="btn btn-outline-primary">
                  <i className="bi bi-list-ul me-2"></i>View All Loans
                </Link>
                <Link to="/loan-details" className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>Get Loan by ID
                </Link>
                <Link to="/interest-calculator" className="btn btn-outline-primary">
                  <i className="bi bi-calculator me-2"></i>Interest Calculator
                </Link>
                <Link to="/deposit" className="btn btn-outline-primary">
                  <i className="bi bi-cash me-2"></i>Deposit Money
                </Link>
                <Link to="/withdraw" className="btn btn-outline-primary">
                  <i className="bi bi-cash me-2"></i>Withdraw Money
                </Link>
                <Link to="/transfer" className="btn btn-outline-primary">
                  <i className="bi bi-cash me-2"></i>Transfer Money
                </Link>
                 <Link to="/transreport" className="btn btn-outline-primary">
                  <i className="bi bi-cash me-2"></i>Transaction Report
                </Link>
              </div>
            </div>
            <div className="card-footer bg-light py-3 text-center text-muted">
              <i className="bi bi-info-circle me-1"></i> Select an option to proceed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;