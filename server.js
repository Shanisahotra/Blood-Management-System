const express = require('express');
const cors = require('cors');
require('./config/db');
const bodyParser = require('body-parser');
const bloodRoutes = require('./routes/bloodRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Use the routes
app.use('/api/blood', bloodRoutes);
app.use('/api/user', userRoutes);

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
