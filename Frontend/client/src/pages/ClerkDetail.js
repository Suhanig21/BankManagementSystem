// src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RepaymentGenerator from '../components/RepaymentGenerator';
import 'bootstrap-icons/font/bootstrap-icons.css';
import InterestCalculator from '../components/InterestCalculator'; // Adjust path if necessary


const ClerkDetail = () => {
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
            <i className="bi bi-shield-lock me-2"></i>Clerk Rules and Regulation
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
             
             1. loan check <br></br>
             2. account Create
            </div>
          )}
        </div>
        <div className="card-footer bg-light py-3">
          <div className="d-flex justify-content-between align-items-center">
            
              
              
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClerkDetail;