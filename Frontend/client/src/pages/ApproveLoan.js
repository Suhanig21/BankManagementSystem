import React, { useEffect, useState } from "react";
import axios from "axios";
function ApproveLoan() {
  const [loanRequests, setLoanRequests] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/loans/pending")
      .then((res) => setLoanRequests(res.data))
      .catch((err) => console.error(err));
  }, []);
  const approveLoan = (loanId) => {
    axios.post(`http://localhost:8080/api/loans/approve/${loanId}`)
      .then(() => {
        alert("Loan Approved");
        setLoanRequests(loanRequests.filter(l => l.loanId !== loanId));
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Approve Loan Requests</h2>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Loan ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan) => (
                <tr key={loan.loanId}>
                  <td>{loan.loanId}</td>
                  <td>{loan.customerName}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.type}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => approveLoan(loan.loanId)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ApproveLoan;