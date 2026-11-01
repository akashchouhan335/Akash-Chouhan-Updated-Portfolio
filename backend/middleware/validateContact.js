// Validates contact form payload.
// Rules:
//   name    — required, string, max 100 chars
//   email   — required, valid email format, max 254 chars
//   subject — optional, string, max 200 chars
//   message — required, string, min 10, max 2000 chars

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function validateContact(req, res, next) {
  const { name, email, subject, message } = req.body ?? {}
  const errors = []

  // name
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push({ field: 'name', message: 'Name is required.' })
  } else if (name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be 100 characters or fewer.' })
  }

  // email
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required.' })
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push({ field: 'email', message: 'Please enter a valid email address.' })
  } else if (email.trim().length > 254) {
    errors.push({ field: 'email', message: 'Email address is too long.' })
  }

  // subject (optional)
  if (subject !== undefined && subject !== null && typeof subject === 'string' && subject.trim().length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be 200 characters or fewer.' })
  }

  // message
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push({ field: 'message', message: 'Message is required.' })
  } else if (message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters.' })
  } else if (message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message must be 2000 characters or fewer.' })
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed.', errors })
  }

  // Sanitize: attach trimmed values to body
  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: (subject ?? '').trim(),
    message: message.trim(),
  }

  next()
}
