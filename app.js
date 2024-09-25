const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/database');
const uploadRoutes = require('./routes/uploadRoutes');

app.use(bodyParser.json());
connectDB(); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes); 
app.use('/movies', movieRoutes); 
app.use('/api', uploadRoutes);
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
