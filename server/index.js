const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3000'  // Allow requests from this origin
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/conges', require('./routes/congeRoutes'));  // Corrected route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
