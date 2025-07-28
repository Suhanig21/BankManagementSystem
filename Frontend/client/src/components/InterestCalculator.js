import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RepaymentGenerator from './RepaymentGenerator';

const InterestCalculator = ({ loanId: initialLoanId = '', loanAmount: initialLoanAmount = '' }) => {
  const [loanId, setLoanId] = useState(initialLoanId);
  const [loanAmount, setLoanAmount] = useState(initialLoanAmount);
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);

  const fetchLoanDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/loan/${loanId}`);
      setLoanAmount(response.data.loanAmount);
      setError('');
    } catch (err) {
      setError('Loan not found. Please check the ID.');
      setLoanAmount('');
    }
  };

  const calculateInterest = async () => {
    try {
      const payload = {
        loanAmount: parseFloat(loanAmount),
        rate: parseFloat(rate),
        time: parseFloat(time),
      };

      const response = await axios.post('http://localhost:8080/loan/calculate-interest', payload);
      setInterest(response.data.interest);
      setTotalAmount(response.data.totalAmount);
      setError('');
      setShowSchedule(false);
    } catch (err) {
      console.error("Error calculating interest:", err);
      setError('Failed to calculate interest');
      setInterest(null);
      setTotalAmount(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-calculator me-2"></i>Interest Calculator
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
                    type="text"
                    className="form-control"
                    placeholder="Enter loan ID"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={fetchLoanDetails}
                  >
                    <i className="bi bi-search me-1"></i> Fetch
                  </button>
                </div>
              </div>

              {loanAmount && (
                <div className="alert alert-success d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Fetched Loan Amount: <span className="fw-bold ms-1">₹{parseFloat(loanAmount).toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-cash me-1"></i> Loan Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-percent me-1"></i> Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-clock-history me-1"></i> Time Period (in years)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter time period"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary py-2 fw-semibold"
                  onClick={calculateInterest}
                  disabled={!loanAmount || !rate || !time}
                >
                  <i className="bi bi-calculator-fill me-2"></i>Calculate Interest
                </button>
              </div>

              {error && (
                <div className="alert alert-danger mt-3 d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
              )}

              {interest !== null && totalAmount !== null && (
                <div className="mt-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary mb-3">
                        <i className="bi bi-info-circle me-2"></i>Calculation Results
                      </h5>
                      <div className="row mb-2">
                        <div className="col-6 text-muted">Principal Amount:</div>
                        <div className="col-6 fw-bold">₹{parseFloat(loanAmount).toLocaleString('en-IN')}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-6 text-muted">Interest Amount:</div>
                        <div className="col-6 fw-bold">₹{interest.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="row pb-2 border-bottom">
                        <div className="col-6 text-muted">Time Period:</div>
                        <div className="col-6 fw-bold">{time} {time === '1' ? 'year' : 'years'}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6 text-primary fw-semibold">Total Payable:</div>
                        <div className="col-6 fw-bold fs-5">₹{totalAmount.toLocaleString('en-IN')}</div>
                      </div>

                      <div className="d-grid mt-3">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => setShowSchedule(!showSchedule)}
                        >
                          <i className={`bi ${showSchedule ? 'bi-eye-slash' : 'bi-eye'} me-2`}></i>
                          {showSchedule ? 'Hide' : 'Show'} Repayment Schedule
                        </button>
                      </div>
                    </div>
                  </div>

                  {showSchedule && (
                    <RepaymentGenerator
                      totalAmount={totalAmount}
                      loanAmount={loanAmount}
                      loanId={loanId || null}
                      saveToDB={true}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
