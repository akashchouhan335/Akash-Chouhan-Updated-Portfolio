import rateLimit from 'express-rate-limit'

// 5 requests per 15 minutes per IP
export default rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please wait a few minutes before trying again.',
  },
  skipSuccessfulRequests: false,
})
