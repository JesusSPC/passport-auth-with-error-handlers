const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys.js').MongoURI;

// Connect to MongoDBAtlas
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}...`))