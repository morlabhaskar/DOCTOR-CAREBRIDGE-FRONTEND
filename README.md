# CareBridge - Doctor Appointment Booking System

CareBridge is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to streamline doctor appointment bookings. Users can browse doctors, check availability, book appointments, and manage their bookings seamlessly.

## Features :

- User authentication (JWT-based login & registration)

- Browse and filter doctors by specialization

- Real-time availability of doctors

- Book and cancel appointments

- Admin dashboard for managing doctors and appointments

- Responsive UI with Tailwind CSS

 ## Tech Stack :

### Frontend
- React.js (with Vite for fast builds)
- Axios for API requests
- React Context API for state management
- React Toastify for notifications
- Tailwind CSS for styling

 ### Backend 
 - Node.js & Express.js
- MongoDB with Mongoose ORM
- JWT authentication
- API endpoints for user and appointment management

# Installation

### Prerequisites:

Ensure you have the following installed:

- Node.js (latest LTS version)
- MongoDB

## Steps to Run Locally:

### Clone the repository:
```
git clone https://github.com/yourusername/carebridge.git
cd carebridge
```

### Install dependencies:

Backend:
```
cd backend
npm install
```
Frontend:
```
cd ../frontend
npm install
```

### Setup Environment Variables:

Create a ```.env``` file in the backend directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

For the frontend, set the backend URL in ```.env```:
```
VITE_BACKEND_URL=http://localhost:4000
```

### Start the Application:

Backend:
```
cd backend
npm run dev
```

Frontend:
```
cd frontend
npm run dev
```

The frontend will be available at ```http://localhost:5173.```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.

## Contact

For any issues or feature requests, open an issue on GitHub.
