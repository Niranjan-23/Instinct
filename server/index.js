import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import svgCaptcha from 'svg-captcha';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the project root
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up a secure secret key for captcha signature verification.
// Falls back to a randomly generated secret at startup if CAPTCHA_SECRET is not configured in .env.
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.CAPTCHA_SECRET) {
  console.log('⚠️ CAPTCHA_SECRET environment variable not found. Generated a temporary key for this session.');
}

// Middlewares
app.use(cors({
  origin: '*', // Allow requests from any origin (e.g. Vite frontend)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/**
 * GET /api/captcha
 * Generates a distorted text captcha SVG and returns it with an expiration timestamp and HMAC signature.
 */
app.get('/api/captcha', (req, res) => {
  try {
    const captcha = svgCaptcha.create({
      size: 4,             // 4 character code
      noise: 3,             // number of noise lines
      color: true,          // colored text lines
      background: '#121214',// charcoal/dark background to fit design system
      width: 140,
      height: 48,
      fontSize: 40
    });

    // Captcha is valid for 5 minutes
    const expiryTime = Date.now() + 5 * 60 * 1000;
    
    // Hash the lowercase text combined with expiration time using HMAC-SHA256
    const hash = crypto
      .createHmac('sha256', CAPTCHA_SECRET)
      .update(`${captcha.text.toLowerCase()}|${expiryTime}`)
      .digest('hex');

    // Combine signature and expiration timestamp into a single stateless token
    const token = `${hash}.${expiryTime}`;

    res.json({
      success: true,
      image: captcha.data, // SVG XML content
      token
    });
  } catch (error) {
    console.error('Error generating captcha:', error);
    res.status(500).json({ success: false, message: 'Failed to generate captcha' });
  }
});

/**
 * POST /api/submit-inquiry
 * Verifies the captcha and forwards inquiry data to Google Sheets API
 */
app.post('/api/submit-inquiry', async (req, res) => {
  const { name, email, phone, subject, message, captchaCode, captchaToken } = req.body;

  // Basic validation of fields
  if (!name || !email || !phone || !subject || !message || !captchaCode || !captchaToken) {
    return res.status(400).json({
      success: false,
      message: 'All fields, including captcha code and token, are required.'
    });
  }

  try {
    // 1. Verify captcha signature and expiration
    const parts = captchaToken.split('.');
    if (parts.length !== 2) {
      return res.status(400).json({ success: false, message: 'Invalid captcha token structure.' });
    }

    const [providedHash, expiryTimeStr] = parts;
    const expiryTime = parseInt(expiryTimeStr, 10);

    // Check expiration
    if (Date.now() > expiryTime) {
      return res.status(400).json({
        success: false,
        message: 'Captcha code has expired. Please refresh the captcha and try again.'
      });
    }

    // Recompute the HMAC hash using user's input code (case-insensitive)
    const expectedHash = crypto
      .createHmac('sha256', CAPTCHA_SECRET)
      .update(`${captchaCode.trim().toLowerCase()}|${expiryTime}`)
      .digest('hex');

    if (expectedHash !== providedHash) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect captcha code. Please check the image and try again.'
      });
    }

    // 2. Captcha is valid! Now forward submission to Google Sheets API if configured
    const sheetsUrl = process.env.SHEETS_API_URL || process.env.VITE_SHEETS_API_URL;

    if (!sheetsUrl || sheetsUrl.trim() === '') {
      console.log('ℹ️ Sheets API URL is not set. Simulating successful form submission (development mode).');
      // In development mode, return success with a simulation note
      return res.json({
        success: true,
        message: 'Inquiry verified and submitted successfully (Simulated).'
      });
    }

    console.log(`Forwarding verified submission from ${email} to Sheets API...`);

    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({ name, email, phone, subject, message })
    });

    // In 'no-cors' style endpoints (like Google Apps Script usually are), response status may be opaque,
    // but a successful fetch request (no network exceptions) signals completion.
    console.log(`Forwarded successfully! Status: ${response.status}`);
    
    return res.json({
      success: true,
      message: 'Your project inquiry has been verified and sent successfully.'
    });

  } catch (error) {
    console.error('Error processing inquiry submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while sending your message. Please try again later.'
    });
  }
});

// Default root route
app.get('/', (req, res) => {
  res.send('Instinct Captcha API is active and running.');
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Instinct Captcha Backend running on port ${PORT}`);
});
