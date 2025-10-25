import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import jobRouter from './routes/job.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();
const PORT= process.env.PORT || 8001;

//Middlewares
app.use(express.json());
app.use(cookieParser());

// Debug middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log("Headers:", req.headers);
        console.log("Raw Body:", req.body);
        next();
    });
}

const allowedOrigins = [
  process.env.FRONTEND_URL,      // your main production frontend (optional)
  "http://localhost:3000",       // for local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Always allow requests from tools without origin (like Postman)
      if (!origin) return callback(null, true);

      // Allow your fixed origins or any Vercel preview URL pattern
      const vercelPattern = /^https:\/\/mern-project-client-[a-z0-9-]+\.vercel\.app$/;

      if (allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies / credentials if you use them
  })
);

connectDB(); 

//Authentication and User Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/job', jobRouter);


app.get('/',(req,res)=>{
    res.send('DesignHire API is running!');
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;
  res.status(statusCode).json({ 
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
