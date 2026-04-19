// config/staging.js
module.exports = {
  database: {
    uri: process.env.DATABASE_URL,
    debug: false,
    options: {
      maxPoolSize: 10
    }
  },
  cors: {
    origin: ['https://staging.myapp.com'],
    credentials: true
  },
  features: {
    enableEmailVerification: true,
    enableRateLimiting: true,
    debugMode: false
  },
  email: {
    service: 'sendgrid',
    apiKey: process.env.SENDGRID_API_KEY,
    from: 'staging@myapp.com'
  }
}
