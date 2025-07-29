import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TransactionReport = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      
      const res = await axios.get('http://localhost:8080/transreport');
      setTransactions(res.data);
      setMessage('');
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setMessage('❌ Error fetching transactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-9">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white py-3">
              <h2 className="text-center mb-0 fw-bold">
                <i className="bi bi-receipt me-2"></i>Transaction Report
              </h2>
            </div>

            {message && (
              <div className={`alert alert-danger m-3 d-flex align-items-center`}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {message}
              </div>
            )}

            <div className="card-body p-4">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading transaction data...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>Customer ID</th>
                        <th>From Account</th>
                        <th>To Account</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-muted">
                            <i className="bi bi-inbox me-2"></i>No transactions found
                          </td>
                        </tr>
                      ) : (
                        transactions.map((tx) => (
                          <tr key={tx.transactionId}>
                            <td>{tx.transactionId}</td>
                            <td>{tx.transactionType}</td>
                            <td>{tx.customerId}</td>
                            <td>{tx.fromAccountId || '—'}</td>
                            <td>{tx.toAccountId || '—'}</td>
                            <td>₹{tx.amount}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {!isLoading && (
              <div className="card-footer bg-light py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-dark fw-semibold"
                    onClick={fetchTransactions}
                    disabled={isLoading}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>Refresh Data
                  </button>
                  <span className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Total Transactions: {transactions.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReport;
