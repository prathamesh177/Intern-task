import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(null);
  const tableRef = useRef();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stores', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStores(response.data);
        setLoading(false);

        if ($.fn.dataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
        $(tableRef.current).DataTable();
      } catch (err) {
        setError('Error fetching stores. Please try again.');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = async (storeId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setRatingError('StoreOwner Don’t Have Access To Modify This.');
        return;
      }

      await axios.post(
        `http://localhost:5000/api/stores/${storeId}/rate`,
        { userId, rating },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      const response = await axios.get('http://localhost:5000/api/stores', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStores(response.data);
      setRating(0);
      setSelectedStoreId(null);

      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable();
    } catch (err) {
      setRatingError('Error submitting rating. Please try again.');
    }
  };

  if (loading) {
    return <div style={loadingStyle}>Loading stores...</div>;
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  return (
    <div className="container mt-4" style={containerStyle}>
      <h2 style={titleStyle}>Store Listings</h2>
      <table ref={tableRef} className="table table-striped table-bordered" style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Average Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.length === 0 ? (
            <tr>
              <td colSpan="5" style={emptyMessageStyle}>No stores available.</td>
            </tr>
          ) : (
            stores.map((store) => (
              <tr key={store._id} style={rowStyle}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  {store.averageRating !== undefined
                    ? store.averageRating.toFixed(2)
                    : 'No ratings yet'}
                </td>
                <td>
                  {store.ratings && store.ratings.length > 0 ? (
                    store.ratings.find(
                      (r) => r.userId === localStorage.getItem('userId')
                    )?.rating || 'N/A'
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  {selectedStoreId === store._id ? (
                    <div>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                        style={inputStyle}
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleRatingSubmit(store._id)}
                        style={submitButtonStyle}
                      >
                        Submit Rating
                      </button>
                      {ratingError && <div style={ratingErrorStyle}>{ratingError}</div>}
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedStoreId(store._id)}
                      style={rateButtonStyle}
                    >
                      Rate this store
                    </button>
                  )}
                </td>
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
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  color: '#333',
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
};

const tableStyle = {
  width: '100%',
  marginTop: '20px',
  transition: 'all 0.3s ease',
};

const theadStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
};

const rowStyle = {
  transition: 'background-color 0.3s ease',
};

const inputStyle = {
  width: '60px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  textAlign: 'center',
  marginRight: '10px',
};

const submitButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const rateButtonStyle = {
  backgroundColor: '#17a2b8',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const ratingErrorStyle = {
  color: '#dc3545',
  marginTop: '10px',
};

const loadingStyle = {
  textAlign: 'center',
  padding: '50px',
  fontSize: '18px',
  color: '#007bff',
  animation: 'fadeIn 1.5s ease-in-out',
};

const errorStyle = {
  color: '#dc3545',
  textAlign: 'center',
  padding: '20px',
  fontSize: '18px',
};

const emptyMessageStyle = {
  textAlign: 'center',
  color: '#555',
  fontSize: '16px',
};

export default StoreList;
