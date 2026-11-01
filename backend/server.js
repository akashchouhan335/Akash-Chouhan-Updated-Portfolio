import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRouter from './routes/contact.routes.js'

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ────────────────────────────────────────────────────────────────

// CORS — restrict to allowed origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:4173']

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS policy: origin ${origin} not allowed`))
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

// Reject payloads larger than 10kb
app.use(express.json({ limit: '10kb' }))

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api', contactRouter)

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

// Global error handler — never expose internals
app.use((err, _req, res, _next) => {
  console.error('[server error]', err.message)
  res.status(500).json({ error: 'An unexpected error occurred. Please try again.' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[portfolio-api] running on http://localhost:${PORT}`)
})
