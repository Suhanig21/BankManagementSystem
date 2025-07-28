// src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RepaymentGenerator from '../components/RepaymentGenerator';
import 'bootstrap-icons/font/bootstrap-icons.css';
import InterestCalculator from '../components/InterestCalculator'; // Adjust path if necessary


const AdminPanel = () => {
  const [loans, setLoans] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/loan/all');
      setLoans(res.data);
    } catch (err) {
      console.error('Error fetching loans:', err);
      setMessage('Error fetching loans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin-login');
    } else {
      fetchLoans();
    }
  }, []);

  // const handleAction = async (id, action) => {
  //   try {
  //     const res = await axios.put(`http://localhost:8080/loan/${action}/${id}`);
  //     const updatedLoan = res.data;

  //     setMessage(`Loan for ${updatedLoan.fullName} has been ${updatedLoan.status}`);
  //     fetchLoans();
  //   } catch (err) {
  //     console.error(`Error during ${action}:`, err);
  //     setMessage(`Failed to ${action} loan ID ${id}`);
  //   }
  // };
  const handleProcess = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8080/loan/process/${id}`);
      const updatedLoan = res.data;

      setMessage(`Loan for ${updatedLoan.fullName} has been ${updatedLoan.status}`);
      fetchLoans();
    } catch (err) {
      console.error('Error processing loan:', err);
      setMessage(`Failed to process loan ID ${id}`);
    }
  };


  const saveScheduleToDB = async (loanId, schedule) => {
    try {
      await axios.post(`http://localhost:8080/loan/schedule/generate/${loanId}`, schedule);
      setMessage(`Repayment schedule saved for Loan ID ${loanId}`);
    } catch (err) {
      console.error('Failed to save repayment schedule:', err);
      setMessage('Error saving repayment schedule.');
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white py-3">
          <h2 className="mb-0 fw-bold">
            <i className="bi bi-shield-lock me-2"></i>Admin Panel
          </h2>
        </div>
        <div className="card-body p-4">
          {message && (
            <div className="alert alert-info d-flex align-items-center">
              <i className="bi bi-info-circle me-2"></i>
              {message}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading loan data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Loan Amount</th>
                    <th>Purpose</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Generate Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        <i className="bi bi-inbox me-2"></i>No loan applications found
                      </td>
                    </tr>
                  ) : (
                    loans.map((loan) => (
                      <React.Fragment key={loan.id}>
                        <tr>
                          <td>{loan.id}</td>
                          <td>{loan.fullName}</td>
                          <td>{loan.email}</td>
                          <td>₹{loan.loanAmount}</td>
                          <td>{loan.purpose}</td>
                          <td>
                            <span className={`badge ${
                              loan.status === 'Approved' 
                                ? 'bg-success' 
                                : loan.status === 'Rejected' 
                                  ? 'bg-danger' 
                                  : 'bg-warning'
                            }`}>
                              {loan.status}
                            </span>
                          </td>
                          <td>
                            <a
                              href={`http://localhost:8080/loan/download/${loan.id}`}
                              className="btn btn-outline-primary btn-sm me-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="bi bi-download me-1"></i>Download
                            </a>

                            {/* <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleAction(loan.id, 'approve')}
                              disabled={loan.status === 'Approved'}
                            >
                              <i className="bi bi-check-circle me-1"></i>Approve
                            </button> */}
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleProcess(loan.id)}
                              disabled={loan.status === 'Approved' || loan.status === 'Rejected'}
                            >
                              <i className="bi bi-check-circle me-1"></i>Process
                            </button>


                            {/* <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleAction(loan.id, 'reject')}
                              disabled={loan.status === 'Rejected'}
                            >
                              <i className="bi bi-x-circle me-1"></i>Reject
                            </button> */}
                          </td>
                          <td>
                            {loan.status === 'Approved' ? (
                              <>
                                <button
                                  className="btn btn-outline-primary btn-sm me-2"
                                  onClick={() =>
                                    setSelectedLoanId(selectedLoanId === loan.id ? null : loan.id)
                                  }
                                >
                                  <i className={`bi ${selectedLoanId === loan.id ? 'bi-eye-slash' : 'bi-calendar-check'} me-1`}></i>
                                  {selectedLoanId === loan.id ? 'Hide' : 'Generate'}
                                </button>

                                <button
                                  className="btn btn-outline-success btn-sm"
                                  onClick={() =>
                                    setSelectedLoanId(`display-${loan.id}` === selectedLoanId ? null : `display-${loan.id}`)
                                  }
                                >
                                  <i className="bi bi-eye me-1"></i>
                                  {`display-${loan.id}` === selectedLoanId ? 'Hide' : 'Display'}
                                </button>
                              </>
                            ) : (
                              <span className="text-muted">
                                <i className="bi bi-hourglass me-1"></i>Yet to be approved
                              </span>
                            )}
                          </td>

                        </tr>

                        {selectedLoanId === loan.id && (
                          <tr>
                            <td colSpan="8" className="bg-light">
                              <div className="p-3">
                                <h5 className="mb-3 fw-bold text-primary">
                                  <i className="bi bi-calculator me-2"></i>
                                  Interest Calculator
                                </h5>
                                <InterestCalculator 
                                  loanId={loan.id}
                                  loanAmount={loan.loanAmount}
                                  saveToDB={true}
                                />
                              </div>
                            </td>
                          </tr>
                        )}
                        {selectedLoanId === `display-${loan.id}` && (
                          <tr>
                            <td colSpan="8" className="bg-light">
                              <div className="p-3">
                                <h5 className="mb-3 fw-bold text-success">
                                  <i className="bi bi-calendar-event me-2"></i>
                                  Repayment Schedule Viewer
                                </h5>
                                <RepaymentGenerator 
                                  loanId={loan.id}
                                  loanAmount={loan.loanAmount}
                                  saveToDB={false} // Only fetch and show, don't save
                                />
                              </div>
                            </td>
                          </tr>
                        )}

                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-light py-3">
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-outline-primary" 
              onClick={fetchLoans}
              disabled={isLoading}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>Refresh Data
            </button>
            <span className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Total Loans: {loans.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;