# Node.js + MongoDB Backend Project

A production-ready Node.js backend application with MongoDB integration, JWT authentication, and comprehensive API structure.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## 📦 Dependencies

### Production

- **express** (v5.2.1) - Web framework
- **mongoose** (v9.2.1) - MongoDB ODM
- **jsonwebtoken** (v9.0.3) - JWT authentication
- **bcrypt** (v6.0.0) - Password hashing
- **dotenv** (v17.2.4) - Environment variables
- **cors** (v2.8.6) - Cross-origin resource sharing
- **cookie-parser** (v1.4.7) - Cookie parsing
- **mongoose-aggregate-paginate-v2** (v1.1.4) - Pagination support

### Development

- **nodemon** (v3.1.11) - Auto-restart on changes

## 📁 Project Structure

```
03-connect-DB/
├── src/
│   ├── index.js              # Application entry point
│   ├── app.js                # Express app configuration
│   ├── constants.js          # Application constants
│   ├── db/
│   │   └── index.js          # Database connection
│   ├── models/
│   │   ├── user.model.js     # User schema
│   │   └── video.model.js    # Video schema
│   ├── controllers/          # Route handlers
│   ├── routes/               # API routes
│   ├── middlewares/          # Custom middlewares
│   └── utils/
│       ├── apiError.js       # Custom error class
│       ├── ApiResponse.js    # Standard response format
│       └── asyncHandler.js   # Async error wrapper
└── public/
    └── temp/                 # Temporary file storage
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URL=mongodb://localhost:27017
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your-secret-key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRY=10d
```

## 🔧 Available Scripts

```json
{
  "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
  "start": "node src/index.js"
}
```

## 📊 Database Models

### User Model

- username (unique, indexed)
- email (unique)
- password (hashed with bcrypt)
- avatar
- coverImage
- watchHistory
- role (user/admin)
- refreshToken
- JWT methods included

### Video Model

- title
- description
- videoUrl
- thumbnailUrl
- owner (reference to User)
- duration
- views
- likes
- isPublished
- tags
- Pagination support enabled

## 🔐 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- HTTP-only cookies support
- CORS configuration
- Environment variable protection

## 🛠️ Development

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository

```bash
git clone <repository-url>
cd 03-connect-DB
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```bash
# Create .env file with required variables
```

4. Start MongoDB

```bash
sudo systemctl start mongod
```

5. Run the application

```bash
npm run dev
```

## 📝 API Endpoints

_(To be implemented)_

```
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/logout
GET    /api/v1/users/profile
PUT    /api/v1/users/update
```

## 🧪 Testing

_(To be implemented)_

```bash
npm test
```

## 📚 Additional Documentation

See [notes.md](./notes.md) for detailed setup instructions, optimization tips, and best practices in Hinglish.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

**Ashish Choudhary**

---

**Note:** For detailed setup guide in Hinglish with optimization tips, refer to [notes.md](./notes.md)
