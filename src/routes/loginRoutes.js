const express = require('express');
const generateToken = require('../utils/generateToken');
const validateLogin = require('../middlewares/validateLogin');

const loginRoutes = express.Router();

loginRoutes.post('/', validateLogin, (_req, res) => {
  const token = generateToken(16);
  res.status(200).json({ token });
});

module.exports = loginRoutes;