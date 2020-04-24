const express = require('express');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Routes
app.use('/api/movie', require('./routes/api/movie'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
