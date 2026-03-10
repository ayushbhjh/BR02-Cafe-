import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true
  })
);

// Mongo connection
const mongoUri = process.env.MONGODB_URI;
let useMemoryStore = false;
let memoryLeads = [];

if (!mongoUri) {
  useMemoryStore = true;
  console.warn('MONGODB_URI not set — using in-memory store (data resets on restart).');
} else {
  mongoose
    .connect(mongoUri, { dbName: 'br02' })
    .then(() => console.log('Mongo connected'))
    .catch((err) => {
      useMemoryStore = true;
      console.error('Mongo error, falling back to memory store:', err.message);
    });
}

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    guests: Number,
    date: String,
    time: String,
    message: String,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.replace('Bearer ', '');
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/login', (req, res) => {
  const { adminId, password } = req.body;
  const allowed = [
    { id: process.env.ADMIN_ID, pass: process.env.ADMIN_PASSWORD },
    { id: 'Admin@#1234', pass: '123456789' },
    { id: 'admin', pass: 'br02admin123' } // legacy fallback
  ].filter((c) => c.id && c.pass);

  const isValid = allowed.some((c) => c.id === adminId && c.pass === password);

  if (isValid) {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/reservations', async (req, res) => {
  try {
    if (useMemoryStore) {
      const _id = crypto.randomUUID();
      const reservation = { ...req.body, _id, status: 'pending', createdAt: new Date(), updatedAt: new Date() };
      memoryLeads.unshift(reservation);
      return res.status(201).json(reservation);
    }

    const reservation = await Reservation.create(req.body);
    return res.status(201).json(reservation);
  } catch (err) {
    return res.status(400).json({ error: 'Could not save reservation', details: err.message });
  }
});

app.get('/api/reservations', authMiddleware, async (req, res) => {
  if (useMemoryStore) {
    const todayStr = new Date().toISOString().slice(0, 10);
    const today = memoryLeads.filter((l) => l.date === todayStr).length;
    return res.json({ total: memoryLeads.length, today, leads: memoryLeads });
  }

  const leads = await Reservation.find().sort({ createdAt: -1 }).lean();
  const todayStr = new Date().toISOString().slice(0, 10);
  const today = leads.filter((l) => l.date === todayStr).length;
  return res.json({ total: leads.length, today, leads });
});

app.patch('/api/reservations/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;
  if (useMemoryStore) {
    memoryLeads = memoryLeads.map((l) => (l._id === req.params.id ? { ...l, status, updatedAt: new Date() } : l));
    return res.json({ ok: true });
  }
  await Reservation.findByIdAndUpdate(req.params.id, { status });
  return res.json({ ok: true });
});

app.delete('/api/reservations/:id', authMiddleware, async (req, res) => {
  if (useMemoryStore) {
    memoryLeads = memoryLeads.filter((l) => l._id !== req.params.id);
    return res.json({ ok: true });
  }
  await Reservation.findByIdAndDelete(req.params.id);
  return res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on ${port}`));
