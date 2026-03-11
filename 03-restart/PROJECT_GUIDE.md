# 🚀 Node.js Backend Project — Complete Guide (Hinglish)

> Yeh guide tumhe samjhayegi ki yeh project kaise setup hua hai, kaunsi file kya karti hai, aur naye project mein kaise use karna hai.

---

## 📁 Project Folder Structure (Overview)

```
03-restart/
├── .env                        👈 Secret keys, DB URL, Cloudinary keys (KABHI git mein mat daalo!)
├── .gitignore                  👈 Git ko bolta hai kaunsi files ignore karni hain
├── .prettierrc                 👈 Code formatting ke rules
├── .prettierignore             👈 Prettier ko bolta hai kaunsi files format mat karo
├── package.json                👈 Project ka main config — dependencies, scripts sab yahan hai
├── README.md                   👈 Project ke baare mein info
└── src/                        👈 ⭐ SAARA code yahan likha jaata hai
    ├── index.js                👈 🟢 Entry point — Server yahan start hota hai
    ├── app.js                  👈 Express app setup — middlewares lagao yahan
    ├── costants.js             👈 Constants (DB name etc.)
    ├── db/
    │   └── index.js            👈 MongoDB se connection ka code
    ├── models/
    │   ├── user.model.js       👈 User ka schema (Mongoose)
    │   └── video.model.js      👈 Video ka schema (Mongoose)
    ├── controllers/            👈 (Abhi khali hai) — Business logic yahan aayegi
    ├── routes/                 👈 (Abhi khali hai) — API routes yahan define hote hain
    ├── middlewares/
    │   └── multer.moddleware.js 👈 File upload handle karne ka middleware
    ├── service/
    │   └── Cloudinary.js       👈 Cloudinary pe file upload ka code
    └── utils/
        ├── ApiError.js         👈 Custom error class
        ├── ApiResponse.js      👈 Standard API response class
        └── asyncHandler.js     👈 Async errors handle karne ka wrapper
```

---

## 📦 Step 1: Project Initialize Karo (`package.json`)

### Kya karna hai?
```bash
mkdir my-project && cd my-project
npm init -y
```

### Dependencies install karo:
```bash
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken cloudinary multer mongoose-aggregate-paginate-v2 prettier
npm install --save-dev nodemon
```

### `package.json` mein important cheezein:

| Field | Kya hai |
|-------|---------|
| `"type": "module"` | ES Module syntax use karne ke liye (`import/export`). Bina iske `require()` use karna padega |
| `"scripts" > "dev"` | `nodemon -r dotenv/config --experimental-json-modules src/index.js` — yeh command server ko auto-restart karta hai jab koi file change ho |

### Dependencies ka matlab:

| Package | Kya karta hai |
|---------|---------------|
| `express` | Web server/API banane ke liye |
| `mongoose` | MongoDB se connect aur data manage karne ke liye |
| `dotenv` | `.env` file se secrets load karne ke liye |
| `cors` | Cross-Origin requests allow karne ke liye (frontend se backend call) |
| `cookie-parser` | Cookies padh-ne ke liye |
| `bcrypt` | Password hash karne ke liye (security) |
| `jsonwebtoken (jwt)` | Login ke baad token generate karne ke liye |
| `cloudinary` | Images/Videos cloud pe upload karne ke liye |
| `multer` | File upload handle karne ke liye (multipart form data) |
| `mongoose-aggregate-paginate-v2` | Pagination ke liye (jaise YouTube mein scroll karke aur videos aati hain) |
| `nodemon` | Development mein auto-restart server |

---

## 🔐 Step 2: `.env` File (Secret Configuration)

```env
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=koi_bhi_lamba_random_string
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=ek_aur_lamba_random_string
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=tumhara_cloud_name
CLOUDINARY_API_KEY=tumhari_api_key
CLOUDINARY_API_SECRAT=tumhara_api_secret
```

> ⚠️ **IMPORTANT:** `.env` file ko `.gitignore` mein zaroor daalo. Kabhi bhi GitHub pe push mat karo!

---

## 📄 Step 3: Config Files

### `.prettierrc` — Code formatting rules
```json
{ "singleQuote": false, "trailingComma": "es5", "tabWidth": 2, "semi": true }
```
- `singleQuote: false` → Double quotes use hogi (`"hello"`)
- `trailingComma: "es5"` → Last item ke baad comma lagega
- `tabWidth: 2` → 2 spaces ka tab
- `semi: true` → Har line ke end mein semicolon lagega

### `.prettierignore` — In files ko format mat karo
```
/.vscode
/node_modules
/.dist
*.env
```

### `.gitignore` — In files ko Git track nahi karega
- `node_modules/` — Bahut bada folder, install se aa jaata hai
- `.env` — Secrets hain ismein
- `dist/`, `out/` — Build output

---

## 🟢 Step 4: `src/index.js` — Entry Point (Server Start)

```js
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log(`server is running at port:${process.env.PORT}`);
  })
  .catch((err) => {
    console.log("mongodb connection failed !!!", err);
  });
```

### Yeh kya kar raha hai?
1. **`dotenv.config()`** — `.env` file se saare secrets `process.env` mein load karo
2. **`connectDB()`** — MongoDB se connect karo (async function hai, toh `.then()` use kiya)
3. **`app.listen()`** — Jab DB connect ho jaye, tab server start karo PORT pe
4. **`.catch()`** — Agar DB connection fail ho, toh error print karo

### Flow:
```
dotenv load → MongoDB connect → Server start on PORT 8000
```

---

## 🌐 Step 5: `src/app.js` — Express App Setup

```js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

export { app };
```

### Yeh kya kar raha hai?
| Line | Kya karta hai |
|------|---------------|
| `cors(...)` | Frontend se backend ko safely call karne deta hai. `credentials: true` ka matlab cookies bhi bhej sakte ho |
| `express.json({ limit: "16kb" })` | JSON body parse karta hai (jab frontend se data aata hai). `16kb` limit rakhi hai |
| `express.urlencoded(...)` | Form data parse karta hai (jaise HTML forms se data aata hai) |
| `express.static("public")` | `public/` folder ki files directly serve hoti hain (images, CSS, etc.) |

### Naye project mein kya karna hai?
- Routes add karo: `app.use("/api/v1/users", userRouter);`
- Cookie parser lagao: `app.use(cookieParser());` ← **Note: yeh abhi code mein use nahi hua, lekin import hua hai!**

---

## 📊 Step 6: `src/costants.js` — Constants

```js
export const DB_NAME = "learning-node";
```

- Database ka naam yahan define karo
- Isse baar baar hardcode nahi karna padta

---

## 🗄️ Step 7: `src/db/index.js` — MongoDB Connection

```js
import mongoose from "mongoose";
import { DB_NAME } from "../costants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDB connected !! host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("mongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
```

### Yeh kya kar raha hai?
1. `mongoose.connect()` — MongoDB Atlas se connect karta hai
2. URI format: `mongodb+srv://user:pass@cluster.net/DB_NAME`
3. Agar connection fail ho → `process.exit(1)` se app band ho jaayegi
4. Agar success ho → host print karega

---

## 👤 Step 8: `src/models/user.model.js` — User Schema

### Schema ka structure:
| Field | Type | Description |
|-------|------|-------------|
| `username` | String | Unique, lowercase, indexed (fast search) |
| `email` | String | Unique, lowercase |
| `fullName` | String | User ka poora naam |
| `avatar` | String | Cloudinary URL (profile pic) |
| `password` | String | Hashed password (bcrypt se) |
| `watchHistory` | [ObjectId] | Video model ka reference — user ne kaunsi videos dekhi |
| `refreshToken` | String | Login ke liye refresh token |

### Important features:
```js
// timestamps: true → automatically createdAt aur updatedAt add karta hai
{ timestamps: true }
```

### Pre-save Hook (Password Hashing):
```js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});
```
- Jab bhi user save hota hai, **pehle** password hash hota hai
- `isModified("password")` check karta hai ki password change hua ya nahi — agar nahi hua toh skip

### Custom Methods:
```js
isPasswordCorrect(password)     → Password compare karta hai (login ke time)
generateAccessToken()           → JWT access token banata hai (short-lived, 1 day)
generateRefreshToken()          → JWT refresh token banata hai (long-lived, 10 days)
```

> ⚠️ **Note:** Code mein `userSchema.method` likha hai, sahi `userSchema.methods` hona chahiye (with 's')!

---

## 🎬 Step 9: `src/models/video.model.js` — Video Schema

### Schema ka structure:
| Field | Type | Description |
|-------|------|-------------|
| `videoFile` | String | Cloudinary pe uploaded video ka URL |
| `thumbnail` | String | Video ka thumbnail image URL |
| `title` | String | Video ka title |
| `description` | String | Video ki description |
| `duration` | Number | Video ki length (seconds mein) |
| `views` | Number | Kitni baar dekhi gayi (default 0) |
| `isPublished` | Boolean | Video publish hai ya nahi (default true) |
| `owner` | ObjectId | User model ka reference — kisne upload ki |

### Paginate Plugin:
```js
videoSchema.plugin(mongooseAggregatePaginate);
```
- Yeh plugin `Video.aggregatePaginate()` method deta hai
- Videos ko page-wise fetch kar sakte ho (jaise YouTube mein infinite scroll)
- Advanced aggregation queries ke saath pagination

---

## 📤 Step 10: `src/middlewares/multer.moddleware.js` — File Upload

```js
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");       // Files yahan temporarily save hoti hain
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);     // Original naam se save hota hai
  },
});

export const upload = multer({ storage: storage });
```

### Yeh kya kar raha hai?
1. User jab file (image/video) upload karega → pehle `public/temp/` mein save hogi
2. Phir Cloudinary pe upload karke temp file delete kar denge
3. `upload` ko middleware ki tarah route mein use karo:
```js
router.post("/upload", upload.single("avatar"), controller);
```

---

## ☁️ Step 11: `src/service/Cloudinary.js` — Cloud Upload

```js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRAT,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);  // Upload fail hua toh temp file delete karo
  }
};
```

### Flow:
```
User uploads file → Multer saves to public/temp/ → Cloudinary uploads → Temp file deleted
```

- `resource_type: "auto"` — Image, video, raw kuch bhi ho, Cloudinary detect kar lega

---

## 🛠️ Step 12: `src/utils/` — Utility Classes

### `ApiError.js` — Custom Error Class
```js
class ApiError extends Error {
  constructor(statusCode, message = "something went wrong", error = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.error = error;
  }
}
```
- Standard Error class ko extend karta hai
- Har jagah `throw new ApiError(400, "user not found")` likhne mein easy hota hai
- Status code, message, errors sab ek jagah

### `ApiResponse.js` — Standard Response
```js
class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;  // 200-399 = success, 400+ = fail
  }
}
```
- Har API response same format mein aayega
- Frontend ko pata hoga ki `success`, `data`, `message` kahan milega

### `asyncHandler.js` — Async Error Wrapper
```js
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
```
- Controller functions ko wrap karta hai
- Agar koi async error aaye toh automatically `next(err)` call hoga
- Har controller mein try-catch likhne ki zaroorat nahi!

**Use kaise karo:**
```js
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(new ApiResponse(200, user, "User fetched"));
});
```

---

## 🗂️ Step 13: `controllers/` aur `routes/` — (Abhi khali hain)

### Controllers mein kya aayega?
```
src/controllers/
  └── user.controller.js    → registerUser, loginUser, logoutUser, etc.
  └── video.controller.js   → uploadVideo, getVideos, deleteVideo, etc.
```

### Routes mein kya aayega?
```
src/routes/
  └── user.routes.js        → /api/v1/users ke saare endpoints
  └── video.routes.js       → /api/v1/videos ke saare endpoints
```

### Example Route Setup:
```js
// src/routes/user.routes.js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.moddleware.js";

const router = Router();
router.route("/register").post(upload.single("avatar"), registerUser);

export default router;
```

### Example: `app.js` mein route import karo:
```js
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
```

---

## 🔄 Naya Project Banane Ka Complete Flow

### Step-by-step karo:

```
1. mkdir new-project && cd new-project
2. npm init -y
3. package.json mein "type": "module" add karo
4. Dependencies install karo (Step 1 dekho)
5. Folder structure banao:
   src/
   ├── index.js
   ├── app.js
   ├── constants.js
   ├── db/index.js
   ├── models/
   ├── controllers/
   ├── routes/
   ├── middlewares/
   ├── service/
   └── utils/
6. .env file banao (Step 2 dekho)
7. .gitignore mein node_modules aur .env daalo
8. .prettierrc banao (optional but recommended)
9. db/index.js mein MongoDB connection likho
10. models/ mein schemas banao
11. utils/ mein ApiError, ApiResponse, asyncHandler banao
12. middlewares/ mein multer setup karo
13. service/ mein Cloudinary setup karo
14. controllers/ mein business logic likho
15. routes/ mein endpoints define karo
16. app.js mein routes import karo
17. npm run dev se server start karo! 🎉
```

---

## 🧠 Important Concepts Yaad Rakho

| Concept | Samjho |
|---------|--------|
| **MVC Pattern** | Model (data) → Controller (logic) → Routes (endpoint) |
| **Middleware** | Request aur Response ke beech mein jo kaam hota hai (auth check, file upload) |
| **Pre-save Hook** | Database mein save hone se PEHLE kuch karo (jaise password hash) |
| **JWT Tokens** | Login ke baad token milta hai — har request mein token bhejo for auth |
| **Access vs Refresh** | Access token choti life (1d), Refresh token lambi life (10d) |
| **bcrypt** | Password safe store karta hai — plain text mein kabhi mat rakho! |
| **Aggregation Pipeline** | MongoDB mein complex queries — match, group, sort sab ek mein |

---

## ❌ Code Mein Kuch Bugs / Typos Hain — Dhyan Rakho

1. **`costants.js`** → Sahi spelling hai `constants.js`
2. **`multer.moddleware.js`** → Sahi spelling hai `multer.middleware.js`
3. **`userSchema.method`** → Sahi hai `userSchema.methods` (plural 's')
4. **`bcrypt.hash()` mein `await` missing** → `this.password = await bcrypt.hash(this.password, 10)` hona chahiye
5. **`Process.exit(1)`** → Sahi hai `process.exit(1)` (lowercase 'p')
6. **`asyncHandler` mein `return` missing** → Function ko return karna chahiye
7. **`Cloudinary.js` mein `response` import galat hai** → `express` se `response` import ki zaroorat nahi
8. **`Cloudinary.js` mein `await` missing** → `await cloudinary.uploader.upload(...)` hona chahiye
9. **`Cloudinary.js` mein `uploadCloudinary` export nahi hua** → `export { uploadCloudinary }` lagao
10. **`ApiResponse` class export nahi hui** → `export { ApiResponse }` lagao
11. **`app.js` mein `cookieParser` import hua hai par use nahi hua** → `app.use(cookieParser())` lagao
12. **`ApiError.js` mein `this.message = false`** → Yeh `message` ko override kar raha hai, hona chahiye `this.message = message`

---

> 💡 **Tip:** Jab bhi naya project banao, yeh same structure follow karo. Professional projects mein yahi pattern use hota hai!
