# Connect Frontend Backend

A full-stack application demonstrating frontend-backend integration with React (Vite) and Express.js.

## 📁 Project Structure

```
connect-frontend-backend/
├── backend/          # Express.js API server
│   ├── server.js     # Main server file with API endpoints
│   └── package.json  # Backend dependencies
└── frontend/         # React + Vite application
    ├── src/
    │   ├── App.jsx   # Main React component
    │   └── main.jsx  # Application entry point
    └── package.json  # Frontend dependencies
```

## 🚀 Features

- **Backend**: Express.js REST API serving jokes data
- **Frontend**: React application fetching and displaying data from backend
- **Communication**: Axios for HTTP requests
- **Development**: Hot reload enabled for both frontend and backend

## 🛠️ Tech Stack

### Backend
- **Express.js** v5.2.1 - Web framework
- **Node.js** - Runtime environment
- **ES Modules** - Modern JavaScript syntax

### Frontend
- **React** v19.2.0 - UI library
- **Vite** v7.2.4 - Build tool and dev server
- **Axios** v1.13.2 - HTTP client
- **ESLint** - Code linting

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository
```bash
git clone git remote add origin https://github.com/codezenashish/learning-nodejs.git
cd connect-frontend-backend
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:3000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` (default Vite port)

## 🔌 API Endpoints

### GET /jokes
Returns an array of 5 jokes

**Response:**
```json
[
  {
    "id": 1,
    "title": "joke 1",
    "constent": "this is joke 1"
  },
  ...
]
```

## 💡 How It Works

1. **Backend**: The Express server (`backend/server.js`) exposes a `/jokes` endpoint that returns an array of joke objects
2. **Frontend**: The React app (`frontend/src/App.jsx`) uses Axios to fetch data from the backend API on component mount
3. **Data Flow**: When the frontend loads, it makes a GET request to `http://localhost:3000/jokes` and displays the results

## 📝 Available Scripts

### Backend
- `npm start` - Start the Express server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔍 Development Notes

- Both servers need to be running simultaneously for the application to work
- The frontend makes direct HTTP requests to `http://localhost:3000` 
- CORS is not configured in the current setup - consider adding CORS middleware for production

## 🚧 Future Enhancements

- Add CORS configuration
- Implement environment variables for API URLs
- Add error handling and loading states
- Create a proxy configuration in Vite
- Add more API endpoints
- Implement database integration

## 👤 Author

Ashish Choudhary

## 📄 License

ISC
