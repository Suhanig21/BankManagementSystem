import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const WithdrawMoney = () => {
  const [form, setForm] = useState({
    pinNumber: '',
    amount: '',
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
      await axios.post('http://localhost:8080/withdraw', form);
      setMessage('✅ Money is withdrawn successfully!');
      setForm({
        pinNumber: '',
        amount: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Error withdrawing money.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-danger text-white py-3">
              <h2 className="text-center mb-0 fw-bold">
                <i className="bi bi-cash-stack me-2"></i>Withdraw Money
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
                    <i className="bi bi-lock me-1"></i> PIN Number
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="pinNumber"
                    value={form.pinNumber}
                    onChange={handleChange}
                    placeholder="Enter PIN number"
                    maxLength="4"
                    minLength="4"
                    pattern="[0-9]{4}"
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
                      placeholder="Enter amount to withdraw"
                      min="1"
                      required
                    />
                  </div>
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
                    placeholder="Description (optional)"
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-danger py-2 fw-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cash-stack me-2"></i>Withdraw Money
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

export default WithdrawMoney;