const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000'  // Allow requests from this origin
}));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// ... other routes and middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
