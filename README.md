# BR-02 Cafe & Restaurant

Premium restaurant landing page with reservations lead capture and admin dashboard.

## Stack
- Frontend: Next.js 14 + Tailwind + Framer Motion
- Backend: Express + MongoDB + JWT auth (auto fallbacks to in-memory store if Mongo is unavailable)

## Quick start

### Backend
```
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```
*Optional:* Set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` (e.g. `http://localhost:4000`) to point at the Express API. If left empty, the built-in Next.js API routes with in-memory storage will be used so the form works without the backend running.

## Default admin (local)
- ID: `Admin@#1234`
- Password: `123456789`
- Legacy fallback still accepted: `admin` / `br02admin123`
# BR02-Cafe-
