
// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// const CustomerDetails = () => {
//   const [customerId, setCustomerId] = useState('');
//   const [customer, setCustomer] = useState(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const handleFetch = async () => {
//     if (!customerId) {
//       setError('Please enter a Customer ID');
//       return;
//     }
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:8080/api/customers/${user_id}`);
//       setCustomer(response.data);
//       setError('');
//     } catch (err) {
//       setCustomer(null);
//       setError('Customer not found! Please check the ID and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8 col-lg-6">
//           <div className="card shadow border-0">
//             <div className="card-header bg-primary text-white py-3">
//               <h2 className="mb-0 fw-bold">
//                 <i className="bi bi-person-badge me-2"></i>Find Customer by ID
//               </h2>
//             </div>
//             <div className="card-body p-4">
//               <div className="mb-4">
//                 <label className="form-label fw-semibold">Customer ID</label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-light">
//                     <i className="bi bi-person-circle"></i>
//                   </span>
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Enter Customer ID"
//                     value={customerId}
//                     onChange={(e) => setCustomerId(e.target.value)}
//                   />
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleFetch}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                     ) : (
//                       <i className="bi bi-search me-1"></i>
//                     )}
//                     {isLoading ? ' Searching...' : ' Search'}
//                   </button>
//                 </div>
//               </div>
//               {error && (
//                 <div className="alert alert-danger d-flex align-items-center">
//                   <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                   {error}
//                 </div>
//               )}
//               {customer && (
//                 <div className="card border-0 bg-light shadow-sm mt-3">
//                   <div className="card-body p-4">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <h5 className="card-title text-success mb-0">
//                         <i className="bi bi-person-lines-fill me-2"></i>Customer Details
//                       </h5>
//                       <span className="badge bg-success">ID: {customer.userId}</span>
//                     </div>
//                     <div className="row g-3">
//                       <div className="col-12">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-person-fill text-success me-3 fs-4"></i>
//                           <div>
//                             <div className="text-muted small">Full Name</div>
//                             <div className="fw-bold">{customer.fullName}</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-envelope-fill text-success me-3 fs-4"></i>
//                           <div>
//                             <div className="text-muted small">Email Address</div>
//                             <div className="fw-bold">{customer.email}</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-bank text-success me-3 fs-4"></i>
//                           <div>
//                             <div className="text-muted small">Account Balance</div>
//                             <div className="fw-bold">₹{parseFloat(customer.balance).toLocaleString('en-IN')}</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-geo-alt-fill text-success me-3 fs-4"></i>
//                           <div>
//                             <div className="text-muted small">Address</div>
//                             <div className="fw-bold">{customer.address}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CustomerDetails;










