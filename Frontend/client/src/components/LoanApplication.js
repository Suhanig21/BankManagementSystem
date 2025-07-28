import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LoanApplication = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    purpose: '',
  });

  const [document, setDocument] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
      const userId = localStorage.getItem("userId"); // ✅ Get userId from login

      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // 1. Submit loan application
      const response = await axios.post(`http://localhost:8080/loan/apply/${userId}`, form);
      const loanId = response.data.id;

      // 2. Upload document
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post(`http://localhost:8080/loan/upload/${loanId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setMessage('✅ Loan application submitted successfully!');
      setForm({ fullName: '', email: '', loanAmount: '', purpose: '' });
      setFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('❌ Error submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="text-center mb-0 fw-bold">
                <i className="bi bi-file-earmark-text me-2"></i>Loan Application
              </h2>
            </div>
            
            {message && (
              <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} m-3 d-flex align-items-center`}>
                <i className={`bi ${message.includes('✅') ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                {message}
              </div>
            )}
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-person me-1"></i> Full Name
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="fullName" 
                    value={form.fullName} 
                    onChange={handleChange} 
                    placeholder="Enter your full name"
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-envelope me-1"></i> Email Address
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email"
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-currency-rupee me-1"></i> Loan Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="loanAmount" 
                      value={form.loanAmount} 
                      onChange={handleChange} 
                      placeholder="Enter amount"
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-chat-left-text me-1"></i> Purpose
                  </label>
                  <textarea 
                    className="form-control" 
                    name="purpose" 
                    value={form.purpose} 
                    onChange={handleChange} 
                    placeholder="Describe the purpose of the loan"
                    rows="3"
                    required 
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-file-earmark me-1"></i> Upload Document
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                  <div className="form-text text-muted">
                    Please upload supporting documents (ID proof, income proof, etc.)
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary py-2 fw-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;