// config/production.js
module.exports = {
  database: {
    uri: process.env.DATABASE_URL,
    debug: false,
    options: {
      maxPoolSize: 20,  // Larger pool for production
      ssl: true         // Enable SSL
    }
  },
  cors: {
    origin: ['https://myapp.com'],
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
    from: 'noreply@myapp.com'
  },
  monitoring: {
    enableMetrics: true,
    enableTracing: true
  }
}
