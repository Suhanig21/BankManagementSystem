import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('No user ID found. Please log in again.');
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8080/auth/profile/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://localhost:8080/auth/profile/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setEditMode(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (!user) return null;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <i className="bi bi-person-circle fs-1 mb-2"></i>
              <h3 className="mb-0">Profile</h3>
            </div>
            <div className="card-body p-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">User ID:</span>
                  <span>{user.id}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Username:</span>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={form.username || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.username}</span>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Role:</span>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      value={form.role || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.role}</span>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Income:</span>
                  {editMode ? (
                    <input
                      type="number"
                      className="form-control"
                      name="income"
                      value={form.income || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.income}</span>
                  )}
                </li>
              </ul>
              <div className="mt-4 text-end">
                {editMode ? (
                  <button className="btn btn-success" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleEditClick}>
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
