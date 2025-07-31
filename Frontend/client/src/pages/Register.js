import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [account, setAccount] = useState({
    accountType: "",
    pin: "",
    balance: "",
    startDate: "",
    userId: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = {
        accountType: account.accountType,
        pin: parseInt(account.pin),
        balance: parseFloat(account.balance),
        startDate: account.startDate,
        user: {
          id: parseInt(account.userId)
        }
      };

      // const res = await axios.post("http://localhost:8080/account/register", payload);
      axios.post('http://localhost:8080/account/register', payload, {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true  // Important if your backend uses session/cookies
})
.then(res => console.log(res))
.catch(err => console.error("here is the error" , err));

      setMessage({
        text: "Account created successfully!",
        type: "success"
      });

      setAccount({
        accountType: "",
        pin: "",
        balance: "",
        startDate: "",
        userId: ""
      });
    } catch (err) {
      setMessage({
        text: err.response?.data || "Account creation failed. Please try again.",
        type: "danger"
      });
      console.error(err);
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
                <i className="bi bi-person-plus me-2"></i>Register into your Account
              </h2>
            </div>
            <div className="card-body p-4">
              {message.text && (
                <div className={`alert alert-${message.type} d-flex align-items-center`}>
                  <i className={`bi ${message.type === "success" ? "bi-check-circle" : "bi-exclamation-triangle"} me-2`}></i>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">User Id</label>
                  <input
                    type="text"
                    name="userId"
                    className="form-control"
                    value={account.userId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Account Type</label>
                  <input
                    type="text"
                    name="accountType"
                    className="form-control"
                    value={account.accountType}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Balance</label>
                  <input
                    type="text"
                    name="balance"
                    className="form-control"
                    value={account.balance}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Pin</label>
                  <input
                    type="text"
                    name="pin"
                    className="form-control"
                    value={account.pin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    className="form-control"
                    value={account.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                      <i className="bi bi-person-plus-fill me-2"></i>Register
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="card-footer bg-light py-3 text-center">
              <span className="text-muted">Already have an account? </span>
              <a href="/login" className="text-primary">Login here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;