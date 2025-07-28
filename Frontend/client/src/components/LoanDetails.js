import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LoanDetails = () => {
  const [loanId, setLoanId] = useState('');
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    if (!loanId) {
      setError('Please enter a Loan ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:8080/loan/${loanId}`);
      setLoan(response.data);
      setError('');
    } catch (err) {
      setLoan(null);
      setError('Loan not found! Please check the ID and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-search me-2"></i>Find Loan by ID
              </h2>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <label className="form-label fw-semibold">Loan ID</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-credit-card"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Loan ID"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                  />
                  <button 
                    className="btn btn-primary" 
                    onClick={handleFetch}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-search me-1"></i>
                    )}
                    {isLoading ? ' Searching...' : ' Search'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {loan && (
                <div className="card border-0 bg-light shadow-sm mt-3">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-primary mb-0">
                        <i className="bi bi-file-text me-2"></i>Loan Details
                      </h5>
                      <span className="badge bg-primary">ID: {loan.id}</span>
                    </div>
                    
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-fill text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Applicant Name</div>
                            <div className="fw-bold">{loan.fullName}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-envelope-fill text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Email Address</div>
                            <div className="fw-bold">{loan.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-cash-stack text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Loan Amount</div>
                            <div className="fw-bold">₹{parseFloat(loan.loanAmount).toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-chat-left-text-fill text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Purpose</div>
                            <div className="fw-bold">{loan.purpose}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;