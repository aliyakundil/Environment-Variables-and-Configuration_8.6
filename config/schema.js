// config/schema.js
const Joi = require('joi')

const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  REDIS_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('24h'),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  MAX_UPLOAD_SIZE: Joi.string().default('5mb'),
  CORS_ORIGIN: Joi.string().default('*'),
  EMAIL_SERVICE: Joi.string().valid('sendgrid', 'disabled').default('disabled'),
  EMAIL_API_KEY: Joi.string().when('EMAIL_SERVICE', {
    is: 'sendgrid',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
})

// Validate and create config
const { error, value: config } = configSchema.validate(process.env, {
  abortEarly: false,
  stripUnknown: true
})

if (error) {
  console.error('Configuration validation error:')
  error.details.forEach(detail => {
    console.error(`  ${detail.path}: ${detail.message}`)
  })
  process.exit(1)
}

module.exports = config
