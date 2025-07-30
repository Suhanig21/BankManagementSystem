import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
const AccountDetails = () => {
  const [accountId, setAccountId] = useState('');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleFetch = async () => {
    if (!accountId) {
      setError('Please enter an Account ID');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8080/api/accounts/${accountId}`);
      setAccount(response.data);
      setError('');
    } catch (err) {
      setAccount(null);
      setError('Account not found! Please check the ID and try again.');
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
                <i className="bi bi-bank2 me-2"></i>Find Account by ID
              </h2>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <label className="form-label fw-semibold">Account ID</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-hash"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
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
              {account && (
                <div className="card border-0 bg-light shadow-sm mt-3">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-primary mb-0">
                        <i className="bi bi-info-circle me-2"></i>Account Details
                      </h5>
                      <span className="badge bg-primary">ID: {account.id}</span>
                    </div>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-fill text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Customer Name</div>
                            <div className="fw-bold">{account.customerName}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-credit-card text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Account Number</div>
                            <div className="fw-bold">{account.accountNumber}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-ui-checks-grid text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Account Type</div>
                            <div className="fw-bold">{account.accountType}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-currency-rupee text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Balance</div>
                            <div className="fw-bold">₹{parseFloat(account.balance).toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-shield-check text-primary me-3 fs-4"></i>
                          <div>
                            <div className="text-muted small">Status</div>
                            <div className="fw-bold">{account.status}</div>
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
export default AccountDetails;








