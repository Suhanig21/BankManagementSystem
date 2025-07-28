import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/loan/all');
      setLoans(res.data);
      setError('');
    } catch (error) {
      console.error('Error fetching loans:', error);
      setError('Failed to fetch loans. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
          <h2 className="mb-0 fw-bold">
            <i className="bi bi-list-ul me-2"></i>All Loan Applications
          </h2>
          <button 
            className="btn btn-light btn-sm" 
            onClick={fetchLoans}
            disabled={isLoading}
          >
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </div>
        
        <div className="card-body p-0">
          {isLoading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading loan applications...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger m-3 d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          ) : loans.length === 0 ? (
            <div className="text-center p-5">
              <i className="bi bi-inbox fs-1 text-muted"></i>
              <p className="mt-3 mb-0 text-muted">No loan applications found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-center">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id}>
                      <td className="text-center fw-bold">{loan.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-circle me-2 text-primary"></i>
                          {loan.fullName}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-envelope me-2 text-secondary"></i>
                          {loan.email}
                        </div>
                      </td>
                      <td className="fw-semibold">₹{parseFloat(loan.loanAmount).toLocaleString('en-IN')}</td>
                      <td>
                        <span className="text-truncate d-inline-block" style={{ maxWidth: "200px" }} title={loan.purpose}>
                          {loan.purpose}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="card-footer bg-light p-3 d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">Total loans: {loans.length}</small>
          </div>
          <div>
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-download me-1"></i> Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanList;