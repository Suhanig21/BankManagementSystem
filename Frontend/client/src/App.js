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
import ClerkPanel from './pages/ClerkPanel';
import AdminLogin from './pages/AdminLogin';
import InterestCalculator from './components/InterestCalculator';
import ClerkDetail from './pages/ClerkDetail';
import PaymentProcessing from './components/PaymentProcessing';
import ProtectedUserRoute from './components/ProtectedUserRoute'; // ✅ import
import DepositMoney from './components/Deposit'; // Import DepositMoney component
import Withdraw from './components/Withdraw'; // ✅ Import Withdraw component
import Transfer from './components/Transfer'; // Import Transfer component
import TransactionReport from './components/TransactionReport';
import CustomerRegister from './pages/CustomerRegister'
import BranchPanel from './pages/BranchPanel';
import CustomerDetails from './pages/CustomerDetails';
import LoanStatus from './pages/LoanStatus';
import ApproveLoan from './pages/ApproveLoan';
import AccountDetails from './pages/AccountDetails';


const App = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isBranchmanager = localStorage.getItem('isBranchmanager') === 'true';
  const isClerk = localStorage.getItem('isClerk') === 'true';

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/custregister" element={<CustomerRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-loan" element={<LoanApplication />} />
        <Route path="/loan-list" element={<LoanList />} />
        <Route path="/loan-details" element={<LoanDetails />} />
        <Route path="/interest-calculator" element={<InterestCalculator />} />
        <Route path="/deposit" element={<DepositMoney />} />
        <Route path="/withdraw" element={<Withdraw />} /> {/* ✅ Withdraw component */}
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transreport" element={<TransactionReport />} />
        <Route path="/details" element={<ClerkDetail />} />


        {/* ✅ Protected payment route */}
        <Route
          path="/payment"
          element={
            <ProtectedUserRoute>
              <PaymentProcessing />
            </ProtectedUserRoute>
          }
        />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/clerk" element={isClerk ? <ClerkPanel /> : <Navigate to="/admin-login" />} />
        <Route path="/clerk" element={<ClerkPanel />} />

        {/* branch */}
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/loan-status" element={<LoanStatus/>} />
        <Route path="/approve-loan" element={<ApproveLoan />} />
        <Route path="/approve-account" element={<AccountDetails/>} />

        <Route path="/branchmanager" element={isBranchmanager ? <BranchPanel /> : <Navigate to="/admin-login" />} />
        <Route path="/branchmanager" element={<BranchPanel />} />

        {/* <Route path="/clerk" element={<ClerkLogin />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
