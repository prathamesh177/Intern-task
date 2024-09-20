# Store Rating Web Application

This web application allows users to register, log in, and submit ratings for stores. The platform supports different user roles: **System Admin**, **Normal User**, and **Store Owner**, each with unique functionalities. The project is built using the **MERN** stack: MongoDB, Express, React, and Node.js.


## Features

### System Admin:
- Add stores, normal users, and admin users.
- Dashboard displaying:
  - Total stores
  - Total users
  - Submitted ratings
- User and store listings with filter options (name, email, address, role).
- View details of users (name, email, address, role).
- Logout.

### Normal User:
- Sign up, log in.
- View the list of all stores and search by name and address.
- Submit and modify ratings for individual stores.
- Logout.

### Store Owner:
- Log in.
- Dashboard showing:
  - List of users who submitted ratings.
  - Average rating for the store.
- Logout.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Form Validations:** Client-side and Server-side
-  Validations: (validations should be present on all forms)
-  
 ● The name length should be 60 characters max and 20 characters min

 ● The Address length should be 400 characters max
 
 ● The password length max 16 and 8 min, it should have at least 1 
upper, and 1 special character in it.

 ● Email address validation should be there in the email field

## Setup Instructions

### Prerequisites

- **Node.js** (version >= 12)
- **MongoDB** (either local or hosted like MongoDB Atlas)
- **npm** (Node Package Manager)

cd frontend
cd new
npm install

cd backend
npm install

# .env file for backend
MONGODB_URI=mongodb://localhost/storeRatings  # or your MongoDB URI
JWT_SECRET=your_jwt_secret

### Run Backend 
cd backend
npm start

### Run Frontend
cd frontend
cd new
npm start

## Structure
store-rating-app/
├── backend/
│   ├── models/         # Mongoose models (User, Store, Rating)
│   ├── routes/         # Express routes for API
│   ├── controllers/    # Controllers for business logic
│   ├── middleware/     # Auth middleware for role-based access
│   ├── app.js          # Main Express server file
│   ├── config/         # MongoDB and JWT configuration
│   └── package.json    # Backend dependencies
├── frontend/
│   ├── public/         # Public assets (HTML, favicon, etc.)
│   ├── src/
│   │   ├── components/  # React components for different pages (Signup, Login, StoreList, etc.)
│   │   ├── services/    # Axios services to call API
│   │   ├── App.js       # Main React app component
│   └── package.json    # Frontend dependencies
└── README.md           # Project README file

