require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', require('./routes/userRoutes'));

const port = process.env.PORT || 5000;

app.use(errorMiddleware);

connectDB();

app.listen(port, () => console.log(`Server is running on ${port}`));
