import express from 'express'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'
import cors from 'cors'
import 'dotenv/config'
import { confirmationEmail } from './Confirmationemail.js'
import { notificationEmail } from './NotificationEmail.js'

const app = express()

// ─── YOUR EMAIL (receives all form submissions) ────────
const OWNER_EMAIL = 'viren0210@gmail.com'

// ─── RESEND CLIENT (for notification to you) ───────────
const resend = new Resend(process.env.RESEND_API_KEY)

// ─── NODEMAILER GMAIL (for confirmation to user) ───────
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
    family: 4  // ← force IPv4 (Render doesn't support IPv6)
})

// ─── MIDDLEWARE ─────────────────────────────────────────
app.use(express.json())
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    methods: ['POST'],
}))

// ─── SIMPLE RATE LIMITER ────────────────────────────────
// prevents someone spamming your form — max 3 requests per IP per 10 minutes
const rateMap = new Map()

const rateLimit = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const now = Date.now()
    const windowMs = 10 * 60 * 1000  // 10 minutes
    const max = 3

    const entry = rateMap.get(ip) || { count: 0, start: now }

    // reset window if expired
    if (now - entry.start > windowMs) {
        rateMap.set(ip, { count: 1, start: now })
        return next()
    }

    if (entry.count >= max) {
        return res.status(429).json({ error: 'Too many requests. Try again later.' })
    }

    entry.count++
    rateMap.set(ip, entry)
    next()
}

// ─── SANITIZE ───────────────────────────────────────────
// strips HTML tags from user input to prevent injection
const sanitize = str => str.replace(/<[^>]*>/g, '').trim()

// ─── HEALTH CHECK ───────────────────────────────────────
app.get('/', (req, res) => {
    res.json({ status: '✅ Contact API is running' })
})

// ─── CONTACT ROUTE ──────────────────────────────────────
app.post('/contact', rateLimit, async (req, res) => {
    const { name, email, message } = req.body

    // ── server-side validation ──────────────────────────
    if (!name || !email || !message)
        return res.status(400).json({ error: 'Missing fields' })

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return res.status(400).json({ error: 'Invalid email' })

    if (name.length > 100 || email.length > 200 || message.length > 2000)
        return res.status(400).json({ error: 'Input too long' })

    // ── sanitize inputs ─────────────────────────────────
    const cleanName = sanitize(name)
    const cleanEmail = sanitize(email)
    const cleanMessage = sanitize(message)

    // ── send emails independently (one failing won't break the other) ──
    const results = { notificationSent: false, confirmationSent: false }

    // 1️⃣  Notification → YOU via Resend (proven working on Render)
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: OWNER_EMAIL,
            subject: `📩 New message from ${cleanName}`,
            html: notificationEmail(cleanName, cleanEmail, cleanMessage)
        })
        results.notificationSent = true
        console.log('✅ Notification email sent to owner')
    } catch (err) {
        console.error('❌ Notification email failed (Resend):', err.message)
    }

    // 2️⃣  Confirmation → the USER via Nodemailer/Gmail
    try {
        await transporter.sendMail({
            from: `"Viren Kevat" <${process.env.GMAIL_USER}>`,
            to: cleanEmail,
            subject: `Hey ${cleanName}, I got your message!`,
            html: confirmationEmail(cleanName, cleanMessage)
        })
        results.confirmationSent = true
        console.log('✅ Confirmation email sent to user:', cleanEmail)
    } catch (err) {
        console.error('❌ Confirmation email failed (Gmail):', err.message)
    }

    // ── respond based on results ────────────────────────
    if (results.notificationSent || results.confirmationSent) {
        res.json({ success: true })
    } else {
        res.status(500).json({ error: 'Failed to send. Try again.' })
    }
})

// ─── 404 HANDLER ────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// ─── START ──────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`✅ Contact API running on port ${PORT}`)
    console.log(`📧 Notification → Resend → ${OWNER_EMAIL}`)
    console.log(`📧 Confirmation → Gmail SMTP → ${process.env.GMAIL_USER}`)
})