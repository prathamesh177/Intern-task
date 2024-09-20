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

## Setup Instructions

### Prerequisites

- **Node.js** (version >= 12)
- **MongoDB** (either local or hosted like MongoDB Atlas)
- **npm** (Node Package Manager)

### Steps to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/kit-5.git
