import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ isAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user', // Default role is user for normal signup
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Signup successful');
      navigate('/login'); // Redirect to login after signup
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        animation: 'fadeIn 1.5s ease',
        padding: '20px',
      }}
    >
      <h2
        style={{
          fontSize: '32px',
          color: '#333',
          marginBottom: '20px',
          fontWeight: 'bold',
          animation: 'slideDown 1s ease',
        }}
      >
        {isAdmin ? 'Add User' : 'Signup'}
      </h2>
      <form
        onSubmit={handleSignup}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          animation: 'scaleUp 1s ease',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '300px',
            padding: '12px',
            margin: '10px 0',
            borderRadius: '25px',
            border: '2px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            transition: 'border 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
          onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '300px',
            padding: '12px',
            margin: '10px 0',
            borderRadius: '25px',
            border: '2px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            transition: 'border 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
          onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: '300px',
            padding: '12px',
            margin: '10px 0',
            borderRadius: '25px',
            border: '2px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            transition: 'border 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
          onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{
            width: '300px',
            padding: '12px',
            margin: '10px 0',
            borderRadius: '25px',
            border: '2px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            transition: 'border 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
          onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
        />
        {isAdmin && (
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: '300px',
              padding: '12px',
              margin: '10px 0',
              borderRadius: '25px',
              border: '2px solid #ccc',
              fontSize: '16px',
              backgroundColor: '#fff',
              outline: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'border 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
            onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button
          type="submit"
          style={{
            width: '300px',
            padding: '12px',
            margin: '20px 0',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
        >
          {isAdmin ? 'Add User' : 'Signup'}
        </button>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes slideDown {
            0% { transform: translateY(-50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          @keyframes scaleUp {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
