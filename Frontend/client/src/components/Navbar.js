import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-currency-exchange fs-4 me-2"></i>
          <span className="fw-bold">ABC Bank</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive("/register")}`} to="/register">
                <i className="bi bi-person-plus me-1"></i> Register
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive("/login")}`} to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive("/admin-login")}`} to="/admin-login">
                <i className="bi bi-shield-lock me-1"></i> Admin
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive("/payment")}`} to="/payment">
                <i className="bi bi-credit-card me-1"></i> Payment
              </Link>
            </li>
            
            <li className="nav-item ms-2">
              <button
                className="btn btn-light text-primary px-3 py-1 d-flex align-items-center"
                onClick={handleLogout}
                style={{ borderRadius: '20px', fontWeight: '500' }}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;