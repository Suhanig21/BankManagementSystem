// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');
  //   setIsLoading(true);

  //   try {
  //     const res = await axios.post('http://localhost:8080/auth/login', credentials);
  //     console.log('Login response:', res.data);
  //     setSuccess(res.data);

  //     // ✅ Set login flag

  //     localStorage.setItem('isUserLoggedIn', 'true');

  //     // ✅ Redirect to dashboard
  //     setTimeout(() => {
  //       navigate('/dashboard');
  //     }, 1000);
  //   } catch (err) {
  //     if (err.response && err.response.status === 401) {
  //       setError(err.response.data);
  //     } else {
  //       setError("Login failed. Please try again.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8080/auth/login', credentials);
      const data = res.data;

      console.log('Login response:', data);

      if (data && data.id) {
        // ✅ Store userId in localStorage
        localStorage.setItem('userId', data.id);
        localStorage.setItem('isUserLoggedIn', 'true');

        setSuccess('✅ Login successful!');

        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Login response missing user ID.');
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data || 'Unauthorized');
      } else {
        setError('❌ Login failed. Please try again.');
      }
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
                <i className="bi bi-person-circle me-2"></i>User Login
              </h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
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
                      onChange={handleChange}
                      value={credentials.username}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
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
                      onChange={handleChange}
                      value={credentials.password}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success d-flex align-items-center">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                  </div>
                )}

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
                      <i className="bi bi-box-arrow-in-right me-2"></i>Login
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="card-footer bg-light py-3 text-center">
              <span className="text-muted">Don't have an account? </span>
              <a href="/register" className="text-primary">Register here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;