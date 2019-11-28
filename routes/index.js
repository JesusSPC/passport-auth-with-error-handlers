const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth.js');


// Welcome Page
router.get('/', (req, res, next) => {
  res.render('welcome')
})

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
  const user = req.user
  res.render('dashboard', { user })
})

module.exports = router;