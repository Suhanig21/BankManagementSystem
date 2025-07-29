// src/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Login clicked with:', username, password);

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } 
    else if (username === 'clerk' && password === 'clerk') {
      localStorage.setItem('isClerk', 'true');
      navigate('/clerk');
    }
    else if (username === 'branchmanager' && password === 'branchmanager') {
      localStorage.setItem('isBranchmanager', 'true');
      navigate('/branchmanager');
    }else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-person-lock me-2"></i>Admin Login
              </h2>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-1"></i> Username:
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-key me-1"></i> Password:
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button 
                type="button" 
                className="btn btn-primary py-2 fw-semibold w-100"
                onClick={handleLogin}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;