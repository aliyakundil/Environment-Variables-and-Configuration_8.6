// config/environments/development.js
module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/myapp-dev',
    debug: true
  },
  logging: {
    level: 'debug'
  },
  features: {
    enableEmailVerification: false,
    enableRateLimiting: false
  }
}

// config/environments/production.js
module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/myapp-dev',
    debug: true,  // Enable Mongoose debug mode
    options: {
      maxPoolSize: 5  // Smaller pool for development
    }
  },
  redis: {
    url: 'redis://localhost:6379',
    prefix: 'dev:'  // Namespace for development
  },
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  },
  features: {
    enableEmailVerification: false,  // Skip email in development
    enableRateLimiting: false,       // No rate limiting locally
    debugMode: true                  // Additional debugging
  },
  email: {
    service: 'console',  // Log emails instead of sending
    debug: true
  }
}

// config/index.js
const baseConfig = require('./base')
const envConfig = require(`./environments/${process.env.NODE_ENV || 'development'}`)

module.exports = { ...baseConfig, ...envConfig }
