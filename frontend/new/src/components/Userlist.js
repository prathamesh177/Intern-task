import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data);
        setLoading(false);

        // Initialize DataTable after fetching data
        $(document).ready(function () {
          $('#usersTable').DataTable();
        });
      } catch (err) {
        setError('Error fetching users. Please try again.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div style={loadingStyle}>Loading users...</div>;
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  return (
    <div className="container mt-5" style={containerStyle}>
      <h2 style={titleStyle}>User Listings</h2>
      <table
        id="usersTable"
        className="table table-striped table-bordered"
        style={tableStyle}
      >
        <thead style={theadStyle}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={emptyMessageStyle}>No users available.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} style={rowStyle}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Inline Styles
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#007bff',
  fontSize: '24px',
  fontWeight: 'bold',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  transition: 'all 0.3s ease',
};

const theadStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
};

const rowStyle = {
  transition: 'background-color 0.3s ease',
};

const loadingStyle = {
  textAlign: 'center',
  padding: '20px',
  fontSize: '18px',
  color: '#007bff',
  animation: 'fadeIn 1.5s ease-in-out',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  padding: '20px',
  fontSize: '18px',
};

const emptyMessageStyle = {
  textAlign: 'center',
  color: '#555',
  fontSize: '16px',
};

export default UserList;
