import nodemailer from 'nodemailer'

/**
 * Sends a contact form submission via Nodemailer.
 *
 * Configure these environment variables:
 *   CONTACT_TO_EMAIL       — destination email (your inbox)
 *   SMTP_HOST              — SMTP server host (e.g. smtp.gmail.com)
 *   SMTP_PORT              — SMTP port (465 for SSL, 587 for TLS)
 *   SMTP_USER              — SMTP username (e.g. your Gmail address)
 *   SMTP_PASS              — SMTP password / App Password (never commit this)
 *
 * If no SMTP credentials are configured, messages are logged to console only.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const toEmail = process.env.CONTACT_TO_EMAIL

  // Fallback: log to console if no email provider is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[email.service] No SMTP configured — logging message to console:')
    console.log({ to: toEmail, from: email, name, subject, message })
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: toEmail || process.env.SMTP_USER,
    replyTo: email,
    subject: subject
      ? `[Portfolio] ${subject}`
      : `[Portfolio] New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; background: #0a0a0f; color: #f0f0f5; padding: 24px; border-radius: 8px; border: 1px solid #22d3ee44;">
        <h2 style="color: #22d3ee; margin-top: 0;">New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #22d3ee;">${email}</a></p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <hr style="border-color: #ffffff14; margin: 16px 0;" />
        <p style="white-space: pre-wrap; color: #8888a0;">${message}</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
