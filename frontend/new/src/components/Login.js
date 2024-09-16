import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setIsLoggedIn(true);
      setIsAdmin(role === 'admin');

      navigate('/'); // Redirect to home or any other page
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        animation: 'fadeIn 1.5s',
      }}
    >
      <h2 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '28px', fontWeight: 'bold', animation: 'slideIn 1s' }}>
        Login
      </h2>
      <p
        style={{
          color: '#888',
          marginBottom: '20px',
          fontSize: '14px',
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: '1.5',
          animation: 'fadeIn 2s',
        }}
      >
        For Admin Purpose: Use email - walvekarprathamesh734@gmail.com, Password - 12345678
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '12px',
            marginBottom: '15px',
            width: '300px',
            fontSize: '16px',
            borderRadius: '25px',
            border: '2px solid #ccc',
            outline: 'none',
            transition: 'border 0.3s ease-in-out',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
          onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '12px',
            marginBottom: '15px',
            width: '300px',
            fontSize: '16px',
            borderRadius: '25px',
            border: '2px solid #ccc',
            outline: 'none',
            transition: 'border 0.3s ease-in-out',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
          onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
        />
        <button
          type="submit"
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Login
        </button>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes slideIn {
            0% { transform: translateY(-50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
