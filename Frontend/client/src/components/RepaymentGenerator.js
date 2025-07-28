import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepaymentGenerator = ({ totalAmount, loanAmount, loanId, saveToDB = false }) => {
  const [installments, setInstallments] = useState([]);
  const [generated, setGenerated] = useState(false);

  // ✅ Utility to calculate fallback installment amounts
  const calculateInstallmentAmounts = () => {
    let amountToUse = totalAmount;

    if (!totalAmount && loanAmount) {
      const rate = 10;
      const time = 1;
      const interest = (loanAmount * rate * time) / 100;
      amountToUse = loanAmount + interest;
    }

    const installmentCount = 5;
    const installmentAmount = Math.floor(amountToUse / installmentCount);
    const remaining = amountToUse % installmentCount;

    return { installmentAmount, remaining, installmentCount, amountToUse };
  };

  // ✅ Fetch existing schedule and patch missing amounts
  const fetchScheduleFromDB = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/loan/schedule/${loanId}`);
      const data = res.data;

      if (data.length > 0) {
        const today = new Date();
        const { installmentAmount, remaining, installmentCount } = calculateInstallmentAmounts();

        const fixedData = data.map((item, index) => ({
          ...item,
          installmentAmount: item.amount ?? (index === installmentCount - 1 ? installmentAmount + remaining : installmentAmount),
          dueDate:
            item.dueDate ??
            new Date(today.setMonth(today.getMonth() + index + 1)).toISOString().split('T')[0],
          source: 'admin',
        }));

        setInstallments(fixedData);
        setGenerated(true);
      }
    } catch (err) {
      console.error('Error fetching repayment schedule:', err);
    }
  };

  const generateSchedule = async () => {
    const { installmentAmount, remaining, installmentCount, amountToUse } = calculateInstallmentAmounts();

    if (!amountToUse) return;

    const today = new Date();
    const schedule = [];

    for (let i = 0; i < installmentCount; i++) {
      const dueDate = new Date(today);
      dueDate.setMonth(dueDate.getMonth() + i + 1);

      schedule.push({
        installmentNumber: i + 1,
        installmentAmount: i === installmentCount - 1 ? installmentAmount + remaining : installmentAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'Pending',
        source: saveToDB ? 'admin' : 'calculator',
      });
    }

    setInstallments(schedule);
    setGenerated(true);

    if (saveToDB && loanId) {
      try {
        await axios.post(`http://localhost:8080/loan/schedule/loan/${loanId}/repayment-schedule`, schedule);
        console.log('Repayment schedule saved to DB.');
      } catch (error) {
        console.error('Error saving repayment schedule:', error);
      }
    }
  };

  useEffect(() => {
    if (loanId) {
      fetchScheduleFromDB();
    } else if (totalAmount && !generated) {
      generateSchedule();
    }
  }, [loanId, totalAmount]);

  return (
    <div className="mt-4 p-4 border rounded shadow-sm bg-white">
      {!generated && (
        <button className="btn btn-primary mb-3 px-4 py-2 fw-semibold" onClick={generateSchedule}>
          <i className="bi bi-calendar-check me-2"></i>Generate Repayment Schedule
        </button>
      )}

      {installments.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-primary fw-bold">
              <i className="bi bi-calendar-date me-2"></i>
              Repayment Schedule {loanId ? `(Loan ID: ${loanId})` : ''}
            </h5>
            <div className="badge bg-info text-white">Total Installments: {installments.length}</div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col" className="text-center">#</th>
                  <th scope="col">Installment Amount</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {installments.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center fw-bold">{item.installmentNumber}</td>
                    <td>₹{item.installmentAmount.toLocaleString('en-IN')}</td>
                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${item.status === 'Pending' ? 'bg-warning' : item.status === 'Paid' ? 'bg-success' : 'bg-secondary'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RepaymentGenerator;
