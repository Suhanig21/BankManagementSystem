// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-bank me-2"></i>ABC Bank
              </h2>
            </div>
            <div className="card-body p-4 text-center">
              <div className="mb-4">
                <i className="bi bi-cash-coin display-1 text-primary mb-3"></i>
                <h3 className="fw-bold">Welcome to our Platform</h3>
                <p className="text-muted">Please login or register to continue</p>
              </div>

              <div className="d-flex justify-content-center gap-4">
                <Link to="/login" className="btn btn-primary py-2 fw-semibold">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Login
                </Link>
                <Link to="/register" className="btn btn-outline-primary">
                  <i className="bi bi-person-plus me-2"></i>Register
                </Link>
              </div>
            </div>
            <div className="card-footer bg-light py-3 text-center text-muted">
              <i className="bi bi-shield-lock me-1"></i> Secure loan management solutions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;