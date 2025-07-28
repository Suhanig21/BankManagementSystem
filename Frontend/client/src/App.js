import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoanList from './components/LoanList';
import LoanDetails from './components/LoanDetails';
import LoanApplication from './components/LoanApplication';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import InterestCalculator from './components/InterestCalculator';
import PaymentProcessing from './components/PaymentProcessing';
import ProtectedUserRoute from './components/ProtectedUserRoute'; // ✅ import

const App = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-loan" element={<LoanApplication />} />
        <Route path="/loan-list" element={<LoanList />} />
        <Route path="/loan-details" element={<LoanDetails />} />
        <Route path="/interest-calculator" element={<InterestCalculator />} />

        {/* ✅ Protected payment route */}
        <Route
          path="/payment"
          element={
            <ProtectedUserRoute>
              <PaymentProcessing />
            </ProtectedUserRoute>
          }
        />

        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        {/* <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" />} /> */}
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
};

export default App;
