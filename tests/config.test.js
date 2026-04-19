// tests/config.test.js
const config = require('../config')

describe('Configuration', () => {
  beforeEach(() => {
    // Reset environment
    delete process.env.PORT
    delete process.env.DATABASE_URL
  })

  test('should use default port when not specified', () => {
    const testConfig = require('../config')
    expect(testConfig.server.port).toBe(3000)
  })

  test('should use environment variable when specified', () => {
    process.env.PORT = '8080'
    delete require.cache[require.resolve('../config')]
    const testConfig = require('../config')
    expect(testConfig.server.port).toBe(8080)
  })

  test('should validate required configuration', () => {
    delete process.env.JWT_SECRET
    expect(() => {
      delete require.cache[require.resolve('../config')]
      require('../config')
    }).toThrow('Missing required configuration: auth.jwtSecret')
  })
})

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = 'mongodb://localhost:27017/myapp-test'
process.env.JWT_SECRET = 'test-secret-key-32-characters'

const config = require('../config')

// Test configuration
expect(config.database.uri).toContain('myapp-test')
expect(config.features.enableEmailVerification).toBe(false)
