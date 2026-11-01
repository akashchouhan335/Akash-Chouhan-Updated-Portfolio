import { sendContactEmail } from '../services/email.service.js'

export async function handleContact(req, res) {
  const { name, email, subject, message } = req.body

  try {
    await sendContactEmail({ name, email, subject, message })

    return res.status(200).json({
      success: true,
      message: "Your message has been received. I'll get back to you soon.",
    })
  } catch (err) {
    // Log internally but never expose details to client
    console.error('[contact] email send failed:', err.message)
    return res.status(500).json({
      error: 'Failed to send your message. Please try again or email me directly.',
    })
  }
}
