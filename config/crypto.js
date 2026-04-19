// Encrypt sensitive configuration values
const crypto = require('crypto')

function encryptValue(value, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key)
  let encrypted = cipher.update(value, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

function decryptValue(encryptedValue, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key)
  let decrypted = decipher.update(encryptedValue, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

// Usage
const encryptionKey = process.env.CONFIG_ENCRYPTION_KEY
const decryptedSecret = decryptValue(process.env.ENCRYPTED_JWT_SECRET, encryptionKey)
