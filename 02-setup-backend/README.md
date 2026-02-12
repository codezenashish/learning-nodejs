# Learning Node.js

A Node.js project for learning backend development with Express and MongoDB.

## Project Structure

```
learning-nodejs/
├── public/              # Public assets and static files
│   └── temp/           # Temporary files storage
├── src/                # Source code directory
│   ├── app.js         # Express application setup
│   ├── contants.js    # Application constants
│   ├── index.js       # Application entry point
│   ├── controllers/   # Request handlers
│   ├── db/            # Database configuration
│   │   └── index.js   # MongoDB connection setup
│   ├── middlewares/   # Custom middleware functions
│   ├── models/        # Mongoose schemas and models
│   ├── routes/        # API route definitions
│   └── utils/         # Utility functions and helpers
├── package.json       # Project dependencies and scripts
└── README.md         # Project documentation
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables management
- **Nodemon** - Development auto-reload

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/codezenashish/learning-nodejs.git
cd learning-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MOGODB_URL=mongodb://localhost:27017
PORT=3000
```

4. Update environment variables according to your setup.

## Running the Application

### Development Mode
```bash
npm run dev
```

The server will start with nodemon, which automatically restarts on file changes.

## Learning Topics Covered

- Setting up a Node.js project with ES6 modules
- Connecting to MongoDB using Mongoose
- Express.js server configuration
- MVC architecture pattern
- Environment variables management
- Middleware implementation
- RESTful API design
- Database modeling with Mongoose

## Development

- The project uses ES6 modules (`"type": "module"` in package.json)
- Nodemon is configured for automatic server restart during development
- Environment variables are loaded using dotenv

## Notes

This is a learning project focused on understanding Node.js backend development fundamentals.

## License

ISC
