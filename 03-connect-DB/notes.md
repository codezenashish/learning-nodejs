# 🚀 Node.js + MongoDB Project Setup Guide

## 📦 Dependencies Overview

### **Production Dependencies** (Main Dependencies)

```json
{
  "bcrypt": "^6.0.0", // Password hashing ke liye (security)
  "cookie-parser": "^1.4.7", // Cookies parse karne ke liye
  "cors": "^2.8.6", // Cross-Origin requests handle karne ke liye
  "dotenv": "^17.2.4", // Environment variables manage karne ke liye
  "express": "^5.2.1", // Web framework - server banane ke liye
  "jsonwebtoken": "^9.0.3", // JWT tokens generate/verify karne ke liye (authentication)
  "mongoose": "^9.2.1", // MongoDB ODM - database operations ke liye
  "mongoose-aggregate-paginate-v2": "^1.1.4" // Pagination ke liye (aggregation queries mein)
}
```

### **Development Dependencies** (Dev Dependencies)

```json
{
  "nodemon": "^3.1.11" // Auto-restart server on file changes (development mein use hota hai)
}
```

---

## 🛠️ Fresh Project Setup Steps

Agar aap ye project scratch se setup kar rahe ho, to ye steps follow karo:

### **Step 1: Initialize Node.js Project**

```bash
# New folder banao aur usmein jao
mkdir my-nodejs-project
cd my-nodejs-project

# npm initialize karo (package.json create hoga)
npm init -y
```

### **Step 2: Install All Dependencies**

```bash
# Production dependencies install karo
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken mongoose-aggregate-paginate-v2

# Development dependencies install karo
npm install --save-dev nodemon
```

**Ya phir ek saath sab install karo:**

```bash
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken mongoose-aggregate-paginate-v2 && npm install --save-dev nodemon
```

### **Step 3: package.json Configuration Update**

Apne `package.json` mein ye changes karo:

```json
{
  "type": "module", // ES6 modules use karne ke liye (import/export statements)
  "scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
    "start": "node src/index.js"
  }
}
```

### **Step 4: Folder Structure Banao**

```bash
# Ye folders create karo
mkdir -p src/{controllers,models,routes,middlewares,utils,db} public/temp
```

### **Step 5: Environment Variables Setup**

`.env` file banao project ke root mein:

```bash
touch .env
```

`.env` file mein ye variables add karo:

```env
PORT=8000
MONGODB_URL=mongodb://localhost:27017
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your-secret-key-here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-secret-key
REFRESH_TOKEN_EXPIRY=10d
```

### **Step 6: Create .gitignore**

```bash
echo "node_modules
.env
public/temp/*
.DS_Store" > .gitignore
```

### **Step 7: Essential Files Create Karo**

Sabse pehle ye files create karo exactly is order mein:

1. **src/constants.js** - Database name aur constants
2. **src/db/index.js** - Database connection logic
3. **src/utils/asyncHandler.js** - Error handling wrapper
4. **src/utils/apiError.js** - Custom error class
5. **src/utils/ApiResponse.js** - Standard API response format
6. **src/app.js** - Express app configuration
7. **src/index.js** - Entry point (server start)
8. **src/models/** - Mongoose schemas (user, video, etc.)

---

## 📁 Current Folder Structure Analysis

```
03-connect-DB/
├── package.json                 ✅ Dependencies configuration
├── notes.md                     📝 Documentation (ye file)
├── src/
│   ├── index.js                 ✅ Entry point - server start hota hai yaha se
│   ├── app.js                   ✅ Express app configuration
│   ├── constants.js             ✅ Constants (DB_NAME, etc.)
│   │
│   ├── db/
│   │   └── index.js             ✅ MongoDB connection logic
│   │
│   ├── models/                  ✅ Database schemas
│   │   ├── user.model.js        🔹 User schema with JWT & bcrypt
│   │   └── video.model.js       🔹 Video schema with pagination
│   │
│   ├── controllers/             📂 Route handlers (currently empty)
│   ├── routes/                  📂 API routes (currently empty)
│   ├── middlewares/             📂 Custom middlewares (currently empty)
│   │
│   └── utils/                   🛠️ Helper functions
│       ├── apiError.js          ✅ Custom error class
│       ├── ApiResponse.js       ✅ Standard response format
│       ├── asyncHandler.js      ✅ Async error wrapper
│       └── asyncHandler2.js     🔄 Alternative implementation
│
└── public/
    └── temp/                    📁 Temporary file storage
```

---

## 🎯 Folder Structure - Better Approach

**Current structure accha hai**, but kuch improvements ho sakte hain:

### **Recommended Production-Level Structure:**

```
03-connect-DB/
├── .env                         🔒 Environment variables
├── .gitignore                   🚫 Git ignore file
├── package.json
├── README.md                    📖 Project documentation
│
├── src/
│   ├── index.js                 🏁 Entry point
│   ├── app.js                   ⚙️ Express app setup
│   ├── constants.js             📌 App constants
│   │
│   ├── config/                  ⚙️ Configuration files (NEW!)
│   │   ├── db.config.js         // Database configuration
│   │   └── cloudinary.config.js // File upload service config
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── video.model.js
│   │   ├── comment.model.js     // Add more models
│   │   └── playlist.model.js
│   │
│   ├── controllers/             🎮 Business logic yaha
│   │   ├── user.controller.js
│   │   ├── video.controller.js
│   │   └── auth.controller.js
│   │
│   ├── routes/                  🛣️ API endpoints
│   │   ├── user.routes.js
│   │   ├── video.routes.js
│   │   └── index.js             // All routes ko combine karta hai
│   │
│   ├── middlewares/             🛡️ Custom middlewares
│   │   ├── auth.middleware.js   // JWT verification
│   │   ├── multer.middleware.js // File upload
│   │   └── error.middleware.js  // Global error handler
│   │
│   ├── utils/                   🔧 Helper functions
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js        // File upload helper
│   │
│   ├── validators/              ✅ Input validation (NEW!)
│   │   ├── user.validator.js
│   │   └── video.validator.js
│   │
│   └── services/                🔄 Business logic layer (NEW!)
│       ├── user.service.js
│       └── video.service.js
│
├── public/                      📂 Static files
│   ├── temp/                    // Temporary uploads
│   └── assets/                  // Static assets
│
└── tests/                       🧪 Test files (NEW!)
    ├── unit/
    └── integration/
```

---

## ⚡ Code Optimization Suggestions

### **1. User Model Issues & Fixes**

**Problem dekha maine:**

- `generateAccessToken` method duplicate hai (line 76 & 91)
- `isPasswordCorrect` mein `return` statement missing hai

**✅ Fixed Code:**

```javascript
// isPasswordCorrect method (current code mein return missing hai)
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // return add karo
};

// Duplicate method remove karo, only keep one:
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    // return add karo
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
```

### **2. Database Connection Enhancement**

Current code accha hai, but add graceful shutdown:

```javascript
// src/db/index.js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
      {
        // Add these options for better performance
        maxPoolSize: 10,
        minPoolSize: 5,
      }
    );

    console.log(
      `\n MongoDB connected! DB Host: ${connectionInstance.connection.host}`
    );

    // Graceful shutdown handling
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("MONGODB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
```

### **3. App.js Improvements**

Error handling middleware add karo:

```javascript
// src/app.js (end mein add karo)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import karke yaha use karo
// import userRouter from './routes/user.routes.js';
// app.use("/api/v1/users", userRouter);

// Global error handler (last mein)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
```

### **4. Constants File Enhancement**

```javascript
// src/constants.js
export const DB_NAME = "AshishChoudhary";

// Additional useful constants
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};
```

### **5. Environment Variables Security**

**.env file ko properly configure karo:**

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URL=mongodb://localhost:27017
DB_NAME=AshishChoudhary

# CORS
CORS_ORIGIN=http://localhost:3000

# JWT Secrets (Generate strong secrets using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
ACCESS_TOKEN_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1
REFRESH_TOKEN_EXPIRY=7d

# File Upload (if using Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Performance Optimization Tips

### **1. Database Indexing**

```javascript
// Models mein proper indexes use karo
username: {
  type: String,
  index: true,  // ✅ Already done - Good!
}

// Compound indexes bhi add kar sakte ho
userSchema.index({ email: 1, username: 1 });
videoSchema.index({ owner: 1, createdAt: -1 });
```

### **2. Use Lean Queries**

```javascript
// Controllers mein jab sirf read operations ho:
const users = await User.find().lean(); // Faster, plain JavaScript objects return karta hai
```

### **3. Implement Caching**

```bash
npm install redis ioredis
```

### **4. Add Request Validation**

```bash
npm install joi express-validator
```

### **5. Compression Middleware**

```bash
npm install compression
```

```javascript
// app.js mein
import compression from "compression";
app.use(compression());
```

---

## 🔐 Security Best Practices

### **1. Install Security Packages**

```bash
npm install helmet express-rate-limit express-mongo-sanitize xss-clean
```

### **2. Update app.js with Security**

```javascript
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

// Security middlewares
app.use(helmet()); // HTTP headers secure karta hai
app.use(mongoSanitize()); // NoSQL injection prevent karta hai
app.use(xss()); // XSS attacks prevent karta hai

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
});
app.use("/api", limiter);
```

---

## 📝 Additional Recommendations

### **1. Logging System Add Karo**

```bash
npm install winston morgan
```

### **2. Testing Setup**

```bash
npm install --save-dev jest supertest
```

### **3. API Documentation**

```bash
npm install swagger-ui-express swagger-jsdoc
```

### **4. Process Manager for Production**

```bash
npm install -g pm2
```

**Start command:**

```bash
pm2 start src/index.js --name "my-api"
```

---

## 🎯 Quick Start Commands

```bash
# Development mode
npm run dev

# Production mode
npm start

# Check MongoDB connection
mongosh

# View running processes
pm2 list

# Check logs
pm2 logs
```

---

## 📚 Next Steps (Implementation Order)

1. ✅ **Models** - Already created (User & Video)
2. ⏭️ **Controllers** - Business logic implement karo
3. ⏭️ **Routes** - API endpoints define karo
4. ⏭️ **Middlewares** - Auth middleware banao
5. ⏭️ **Validation** - Input validation add karo
6. ⏭️ **Error Handling** - Global error handler
7. ⏭️ **Testing** - Unit & integration tests
8. ⏭️ **Documentation** - API docs with Swagger

---

## 🐛 Common Issues & Solutions

### **Issue 1: MongoDB Connection Failed**

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### **Issue 2: Port Already in Use**

```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>
```

### **Issue 3: Module Not Found Error**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Summary

**Ye project already bahut accha structure follow kar raha hai!**

**Main improvements:**

1. ✅ User model mein bugs fix karo (return statements)
2. ✅ Security packages add karo
3. ✅ Controllers & routes implement karo
4. ✅ Proper error handling add karo
5. ✅ Environment variables ko secure way se manage karo

**Ab aap is guide ko follow karke easily fresh project setup kar sakte ho!** 🚀

---

**Made with ❤️ by Ashish Choudhary**
