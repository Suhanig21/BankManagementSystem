import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentProcessing = () => {
  const [loanId, setLoanId] = useState('');
  const [installmentNumber, setInstallmentNumber] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageType, setMessageType] = useState('');

  const handlePayment = async () => {
    // Validate inputs
    if (!loanId || !installmentNumber || !amountPaid || !paymentDate) {
      setMessage('Please fill in all fields');
      setMessageType('danger');
      return;
    }

    setIsProcessing(true);
    setMessage('');
    
    try {
      const res = await axios.put(`http://localhost:8080/loan/schedule/pay`, null, {
        params: {
          loanId,
          installmentNumber,
          amountPaid,
          paymentDate
        }
      });
      setMessage(res.data);
      setMessageType('success');
      
      // Reset fields on successful payment
      if (res.data.includes('successful')) {
        setAmountPaid('');
        setPaymentDate('');
        // Redirect to dummy Stripe payment gateway
        window.location.href = 'https://buy.stripe.com/test_14kbK5drFf629dmcMM';
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || 'Payment processing failed. Please try again.');
      setMessageType('danger');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-credit-card me-2"></i>Payment Processing
              </h2>
            </div>
            
            <div className="card-body p-4">
              {message && (
                <div className={`alert alert-${messageType} d-flex align-items-center`}>
                  <i className={`bi ${messageType === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                  {message}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-credit-card me-1"></i> Loan ID
                </label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Enter loan ID"
                  value={loanId} 
                  onChange={(e) => setLoanId(e.target.value)} 
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-123 me-1"></i> Installment Number
                </label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Enter installment number"
                  value={installmentNumber} 
                  onChange={(e) => setInstallmentNumber(e.target.value)} 
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-cash me-1"></i> Amount Paid
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter amount"
                    value={amountPaid} 
                    onChange={(e) => setAmountPaid(e.target.value)} 
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar-date me-1"></i> Payment Date
                </label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={paymentDate} 
                  onChange={(e) => setPaymentDate(e.target.value)} 
                  required
                />
              </div>

              <div className="d-grid">
                <button 
                  className="btn btn-primary py-2 fw-semibold" 
                  onClick={handlePayment}
                  disabled={isProcessing || !loanId || !installmentNumber || !amountPaid || !paymentDate}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>Submit Payment
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="card-footer bg-light py-3">
              <div className="text-center text-muted small">
                <i className="bi bi-info-circle me-1"></i>
                Make sure to verify all details before submitting the payment
              </div>
            </div>
          </div>
          
          <div className="card mt-4 shadow-sm border-0 bg-light">
            <div className="card-body p-3">
              <h5 className="card-title text-primary">
                <i className="bi bi-lightbulb me-2"></i>Payment Tips
              </h5>
              <ul className="mb-0 ps-3">
                <li>Always keep your payment receipt for future reference</li>
                <li>Payments may take 1-2 business days to reflect in your account</li>
                <li>For technical issues, contact our support team</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;