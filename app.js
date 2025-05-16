import express from 'express';
import session from 'express-session';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './utils/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Connect to database
await connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        },
    })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/quizzes', quizRoutes);

// Error handler
app.use(errorHandler);

export default app;