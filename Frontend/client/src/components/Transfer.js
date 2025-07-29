import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TransferMoney = () => {
  const [form, setForm] = useState({
    recipientAccountNumber: '',
    amount: '',
    pinNumber: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual backend endpoint
      await axios.post('http://localhost:8080/transfer', form);
      setMessage('✅ Money transferred successfully!');
      setForm({
        recipientAccountNumber: '',
        amount: '',
        pinNumber: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Error transferring money.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-success text-white py-3">
              <h2 className="text-center mb-0 fw-bold">
                <i className="bi bi-arrow-left-right me-2"></i>Transfer Money
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
                    <i className="bi bi-credit-card-2-front me-1"></i> Enter Account Number of Recipient
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="recipientAccountNumber"
                    value={form.recipientAccountNumber}
                    onChange={handleChange}
                    placeholder="Enter recipient's account number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-currency-rupee me-1"></i> Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="Enter amount to transfer"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-lock me-1"></i> PIN
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="pinNumber"
                    value={form.pinNumber}
                    onChange={handleChange}
                    placeholder="Enter your PIN"
                    maxLength="4"
                    minLength="4"
                    pattern="[0-9]{4}"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-chat-left-text me-1"></i> Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter description (optional)"
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success py-2 fw-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-arrow-left-right me-2"></i>Transfer Money
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

export default TransferMoney;