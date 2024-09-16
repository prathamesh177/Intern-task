import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAdmin, isLoggedIn, handleLogout }) => {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      animation: 'slideIn 0.5s ease-in-out',
    }}>
      <ul style={{
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      }}>
        {!isLoggedIn && (
          <>
            <li style={{ margin: '0 15px', position: 'relative' }}>
              <Link to="/login" style={linkStyle}>Login</Link>
            </li>
            <li style={{ margin: '0 15px', position: 'relative' }}>
              <Link to="/signup" style={linkStyle}>Signup</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            {isAdmin ? (
              <>
                <li style={{ margin: '0 15px', position: 'relative' }}>
                  <Link to="/add-store" style={linkStyle}>Add Store</Link>
                </li>
                <li style={{ margin: '0 15px', position: 'relative' }}>
                  <Link to="/add-user" style={linkStyle}>Add User</Link>
                </li>
                <li style={{ margin: '0 15px', position: 'relative' }}>
                  <Link to="/admin-dashboard" style={linkStyle}>Dashboard</Link>
                </li>
                <li style={{ margin: '0 15px', position: 'relative' }}>
                  <Link to="/stores" style={linkStyle}>View Stores</Link>
                </li>
                <li style={{ margin: '0 15px', position: 'relative' }}>
                  <Link to="/users" style={linkStyle}>View Users</Link>
                </li>
              </>
            ) : (
              <li style={{ margin: '0 15px', position: 'relative' }}>
                <Link to="/stores" style={linkStyle}>View Stores</Link>
              </li>
            )}
            <li style={{ margin: '0 15px', position: 'relative' }}>
              <Link to="/change-password" style={linkStyle}>Change Password</Link>
            </li>
            <li style={{ margin: '0 15px', position: 'relative' }}>
              <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Inline CSS for links
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '5px 10px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

linkStyle[':hover'] = {
  backgroundColor: '#444',
  color: '#fff',
};

linkStyle[':after'] = {
  content: '""',
  position: 'absolute',
  width: '0',
  height: '100%',
  top: '0',
  left: '0',
  backgroundColor: '#fff',
  opacity: '0.2',
  transition: 'width 0.3s ease',
};

linkStyle[':hover:after'] = {
  width: '100%',
};

// Inline CSS for logout button
const logoutButtonStyle = {
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

logoutButtonStyle[':hover'] = {
  backgroundColor: '#d32f2f',
};

export default NavBar;
