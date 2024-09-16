import React, { useEffect, useState } from 'react';

const Home = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '30px',
          borderRadius: '15px',
          backgroundColor: '#f5f7fa',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.5s ease-in-out',
          transform: animate ? 'scale(1)' : 'scale(0.9)',
          border: '3px solid transparent',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'border-box',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: '#34495e',
            fontSize: '40px',
            fontWeight: '900',
            marginBottom: '20px',
            transition: 'transform 0.5s ease-in-out, color 0.5s',
            animation: animate ? 'fade-in 2s ease' : 'none',
          }}
        >
          Shop Smart:{' '}
          <span
            style={{
              color: '#e74c3c',
              animation: animate ? 'pulse 1.5s infinite' : 'none',
              fontWeight: 'bold',
              padding: '5px',
            }}
          >
            Rated
          </span>{' '}
          and Explore the Best Stores
        </h1>
      </div>

      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
