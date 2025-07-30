import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const BranchPanel = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-speedometer2 me-2"></i>Branch Manager Dashboard
              </h2>
            </div>
            <div className="card-body p-4">
              <div className="d-grid gap-3">
                {/* <Link to="/customer-details" className="btn btn-primary py-2 fw-semibold">
                  <i className="bi bi-currency-exchange me-2"></i>Customer Details
                </Link> */}
                <Link to="/loan-list" className="btn btn-outline-primary">
                  <i className="bi bi-list-ul me-2"></i>View All Loans
                </Link>
                <Link to="/loan-status" className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>Get Defaulted Loan ID
                </Link>
                <Link to="/approve-loan" className="btn btn-outline-primary">
                  <i className="bi bi-calculator me-2"></i>Loan Requests
                </Link>
                <Link to="/approve-account" className="btn btn-outline-primary">
                  <i className="bi bi-list-ul me-2"></i>View All Accounts
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
export default BranchPanel;