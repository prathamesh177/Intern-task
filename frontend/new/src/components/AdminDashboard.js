import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Dashboard data:', response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Admin Dashboard</h2>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={{ ...cardTitleStyle, color: '#4CAF50' }}>Total Users</h3>
          <CountUp
            start={0}
            end={dashboardData.totalUsers}
            duration={2.5}
            separator=","
            style={cardValueStyle}
          />
        </div>
        <div style={cardStyle}>
          <h3 style={{ ...cardTitleStyle, color: '#2196F3' }}>Total Stores</h3>
          <CountUp
            start={0}
            end={dashboardData.totalStores}
            duration={2.5}
            separator=","
            style={cardValueStyle}
          />
        </div>
        <div style={cardStyle}>
          <h3 style={{ ...cardTitleStyle, color: '#FF5722' }}>Total Ratings</h3>
          <CountUp
            start={0}
            end={dashboardData.totalRatings}
            duration={2.5}
            separator=","
            style={cardValueStyle}
          />
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f9',
  padding: '20px',
  transition: 'background-color 0.5s ease',
};

const titleStyle = {
  fontSize: '32px',
  marginBottom: '20px',
  color: '#333',
  transition: 'color 0.5s ease',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  width: '80%',
  maxWidth: '900px',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
};

const cardTitleStyle = {
  fontSize: '24px',
  marginBottom: '10px',
  transition: 'color 0.3s ease',
};

const cardValueStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  transition: 'color 0.3s ease',
};

export default AdminDashboard;
