const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp';
mongoose.connect(MONGODB_URL);

const JWT_SECRET = process.env.JWT_SECRET 
if (!JWT_SECRET) {
  console.error('JWT_SECRET environment variable is required')
  process.exit(1)
}

// Usage in routes
app.post('/register', (req, res) => {
  if (!features.enableRegistration) {
    return res.status(403).json({ error: 'Registration is disabled' })
  }
  // Registration logic
})

// Environment variables are available through process.env
console.log(process.env.NODE_ENV)     // 'development', 'production', etc.
console.log(process.env.PORT)         // '3000'
console.log(process.env.DATABASE_URL) // Connection string

// Always provide defaults for non-critical settings
const logLevel = process.env.LOG_LEVEL || 'info'
const maxConnections = parseInt(process.env.MAX_CONNECTIONS) || 10

const { config, sanitizeConfig } = require('../config')

console.log('Config:', sanitizeConfig(config))
