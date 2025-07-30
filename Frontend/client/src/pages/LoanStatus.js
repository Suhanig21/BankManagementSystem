import React, { useEffect, useState } from "react";
import axios from "axios";
function LoanStatus() {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/loans/status")
      .then((res) => setLoans(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Loan Status</h2>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Loan ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.loanId}>
                  <td>{loan.loanId}</td>
                  <td>{loan.customerName}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default LoanStatus;











