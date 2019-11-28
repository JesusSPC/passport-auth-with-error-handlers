const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')

const app = express();

// Passport config
require('./config/passport.js')(passport)

// DB Config --- Must create .env with new database uri ---
require('dotenv').config();
const db = `${process.env.MONGOURI}`

// Connect to MongoDBAtlas
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// EJS
app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session Middleware
app.use(session({
  secret: 'whatever',
  resave: true,
  saveUninitialized: true,
}))

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash())

// Global variables to manage color interpretation with errors
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next();
})

// Routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}...`))