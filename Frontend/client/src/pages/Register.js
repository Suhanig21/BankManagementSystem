import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    income: '',
    amount: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await axios.post('http://localhost:8080/auth/register', {
        ...user,
        income: parseFloat(user.income),
        amount: parseFloat(user.amount)
      });

      setMessage({
        text: 'User registered successfully! Please login to continue.',
        type: 'success'
      });

      setUser({ username: '', password: '', income: '', amount: '' });
    } catch (err) {
      setMessage({
        text: err.response?.data || 'Registration failed. Please try again.',
        type: 'danger'
      });
      console.error(err);
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
                <i className="bi bi-person-plus me-2"></i>Register
              </h2>
            </div>
            <div className="card-body p-4">
              {message.text && (
                <div className={`alert alert-${message.type} d-flex align-items-center`}>
                  <i className={`bi ${message.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-person me-1"></i> Username
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={user.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-key me-1"></i> Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Income */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-cash-stack me-1"></i> Income (Monthly)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input
                      type="number"
                      name="income"
                      className="form-control"
                      value={user.income}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-wallet2 me-1"></i> Loan Amount Required
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      value={user.amount}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary py-2 fw-semibold w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus-fill me-2"></i>Register
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="card-footer bg-light py-3 text-center">
              <span className="text-muted">Already have an account? </span>
              <a href="/login" className="text-primary">Login here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
