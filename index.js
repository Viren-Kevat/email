import express from 'express'
import { Resend } from 'resend'
import cors from 'cors'
import 'dotenv/config'
import { confirmationEmail } from './Confirmationemail.js'

const app = express()

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

// ─── RESEND CLIENT ──────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY)

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

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: cleanEmail,
            subject: `Hey ${cleanName}, I got your message!`,
            html: confirmationEmail(cleanName, cleanMessage)  // ← clean one liner
        })

        res.json({ success: true })

    } catch (err) {
        console.error('Resend error:', err)
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
})