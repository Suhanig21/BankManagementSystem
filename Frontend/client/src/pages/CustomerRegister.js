import React, { useState } from 'react';
import axios from 'axios';

const CustomerRegister = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    income: '',
    role: '',
    customerType: '',
    govtId: '',
    phoneNo: '',
    address: '',
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
      const res = await axios.post('http://localhost:8080/auth/custregister', {
        ...user,
        income: parseFloat(user.income),
        amount: parseFloat(user.amount),
        phoneNo: parseInt(user.phoneNo)
      });

      setMessage({
        text: 'User registered successfully! Please login to continue.',
        type: 'success'
      });

      setUser({
        username: '',
        password: '',
        income: '',
        role: '',
        customerType: '',
        govtId: '',
        phoneNo: '',
        address: '',
      });
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
                <i className="bi bi-person-plus me-2"></i>Register the New Customer
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
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Income */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Income (Monthly)</label>
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

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Role</label>
                  <input
                    type="text"
                    name="role"
                    className="form-control"
                    value={user.role}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Customer Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Customer Type</label>
                  <input
                    type="text"
                    name="customerType"
                    className="form-control"
                    value={user.customerType}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Govt ID */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Government ID</label>
                  <input
                    type="text"
                    name="govtId"
                    className="form-control"
                    value={user.govtId}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    className="form-control"
                    value={user.phoneNo}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    value={user.address}
                    onChange={handleChange}
                    required
                    rows="2"
                  ></textarea>
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

export default CustomerRegister;
