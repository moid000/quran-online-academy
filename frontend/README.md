# Quran Online Academy - Premium Frontend

A modern, responsive, and feature-rich React + Vite + Tailwind CSS frontend application for **Al-Noor Online Quran Academy**.

## Features

- **Theme & UI**: Premium deep emerald green (`#0d4f3c`) and gold (`#d4af37`) design, custom typography with Google Fonts (*Inter* for UI and *Amiri* for Quranic script), smooth transitions, responsive layout, and subtle geometric patterns.
- **Public Portal**:
  - **Home**: Hero section, Features, Featured Courses, Fee Packages preview, Stats & Story, Testimonials, Blog highlights, CTA.
  - **Courses & Course Detail**: Comprehensive catalog with filters, search, full curriculum details, instructor profiles, and quick registration.
  - **Pricing**: Transparent fee packages with monthly/annual toggle and plan comparisons.
  - **Blog & Blog Post**: Educational articles, category filters, pagination, related posts, and rich Arabic verses display.
  - **Contact**: Interactive contact form, WhatsApp quick link, location info, and FAQ section.
  - **Register**: Multi-field registration flow with course/package selectors from API, payment method selection, and file screenshot upload preview.
- **Admin Portal**:
  - **Admin Login**: JWT authentication with localStorage management and protected route middleware.
  - **Dashboard Overview**: Analytics, quick metrics, pending approvals list, recent registrations, and quick action bar.
  - **Students Management**: Approval workflow (Approve/Reject/Pending), filter by status, full modal record drawer.
  - **Courses CRUD**: Create, edit, delete, and toggle active status for courses.
  - **Fee Packages CRUD**: Manage plans, pricing, features, and highlight badges.
  - **Blog CRUD**: Draft and publish blog posts, image management, category tagging.
  - **Messages Management**: Contact message inbox, unread badges, full reading drawer, mark as read, delete.
  - **Payment Methods CRUD**: Configure bank accounts, JazzCash, EasyPaisa, PayPal, and Stripe details.
  - **Settings Management**: Site-wide key-value settings editor.
- **API & Mock Fallbacks**: Modular `src/api/` layer for easy backend connection with seamless mock fallback support when offline.

## Setup & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

5. **Preview Build**:
   ```bash
   npm run preview
   ```

## Admin Credentials (Mock Demo Mode)

- **Username**: `admin`
- **Password**: `admin123` (or any password in mock fallback mode)

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Typography**: Inter (UI) & Amiri (Arabic Quranic Verses)
