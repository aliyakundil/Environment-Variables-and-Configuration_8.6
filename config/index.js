const fs = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const baseConfig = require('./base')

// ===== secrets =====
function getSecret(name) {
  const secretPath = process.env[`${name}_FILE`]
  if (secretPath) {
    return fs.readFileSync(secretPath, 'utf8').trim()
  }
  return process.env[name]
}

// ===== CLI =====
const argv = yargs(hideBin(process.argv))
  .option('port', { type: 'number' })
  .option('log-level', { type: 'string' })
  .argv

// ===== features =====
const features = {
  enableRegistration: process.env.ENABLE_REGISTRATION !== 'false',
  enablePasswordReset: process.env.ENABLE_PASSWORD_RESET === 'true',
  enableFileUpload: process.env.ENABLE_FILE_UPLOAD !== 'false',
  maxUsers: parseInt(process.env.MAX_USERS) || null
}

// ===== CONFIG =====
const config = {
  ...baseConfig,

  server: {
    ...baseConfig.server,
    port: argv.port || process.env.PORT || baseConfig.server.port,
    host: process.env.HOST || '0.0.0.0'
  },

  database: {
    uri: process.env.MONGODB_URI || baseConfig.database?.uri
  },

  auth: {
    jwtSecret: getSecret('JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10
  },

  logging: {
    level: argv.logLevel || process.env.LOG_LEVEL || 'info'
  },

  features
}

// ===== validation =====
function validateConfig(cfg) {
  const errors = []

  if (!cfg.database.uri) {
    errors.push('DATABASE_URL is required')
  }

  if (!cfg.auth.jwtSecret || cfg.auth.jwtSecret.length < 10) {
    errors.push('JWT_SECRET is invalid')
  }

  if (cfg.server.port < 1 || cfg.server.port > 65535) {
    errors.push('PORT is invalid')
  }

  if (errors.length) {
    console.error('Configuration errors:')
    errors.forEach(e => console.error(' - ' + e))
    process.exit(1)
  }
}

validateConfig(config)

// ===== sanitize =====
const sensitiveKeys = ['password', 'secret', 'key', 'token']

function sanitizeConfig(obj) {
  const copy = JSON.parse(JSON.stringify(obj))

  function walk(o) {
    for (const key in o) {
      const value = o[key]

      const isSensitive = sensitiveKeys.some(s =>
        key.toLowerCase().includes(s)
      )

      if (isSensitive) {
        o[key] = '[REDACTED]'
      } else if (typeof value === 'object' && value !== null) {
        walk(value)
      }
    }
  }

  walk(copy)
  return copy
}

module.exports = {
  config,
  sanitizeConfig
}