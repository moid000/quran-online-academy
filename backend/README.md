# Quran Online Academy - Backend API

A RESTful backend service for **Quran Online Academy**, providing comprehensive APIs for authentic Quranic education management. Built with Node.js, Express.js, MongoDB (Mongoose), JWT authentication, Nodemailer, and Cloudinary.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Environment Variables](#environment-variables)
- [Admin Seeding Instructions](#admin-seeding-instructions)
- [API Endpoint Documentation](#api-endpoint-documentation)
  - [Health Check](#health-check)
  - [Authentication](#authentication)
  - [Blog Posts](#blog-posts)
  - [Contact Messages](#contact-messages)
  - [Courses](#courses)
  - [Fee Packages](#fee-packages)
  - [Payment Methods](#payment-methods)
  - [Site Settings](#site-settings)
  - [Student Registrations](#student-registrations)
  - [File Uploads](#file-uploads)
- [Deployment Instructions](#deployment-instructions)
  - [Deploying to Railway](#deploying-to-railway)
  - [Deploying to Render](#deploying-to-render)

---

## Project Overview

The Quran Online Academy backend powers the administrative portal and public user interface. Key capabilities include:
- **Authentication & Security:** JWT-based protected routes for admin access and OTP email verification.
- **Course & Package Management:** Content management for courses, pricing packages, and payment methods.
- **Student Registration & Inquiries:** Workflow for prospective student registrations, class scheduling requests, and contact messages.
- **Blog & Content Management:** Dynamic blogging platform supporting categories and auto-generated URL slugs.
- **Dynamic Site Settings:** Key-value store for global platform configurations.
- **Media Uploads:** Cloudinary integration for handling image assets and payment receipt screenshots.

---

## Prerequisites

Before running this application, ensure you have the following installed and configured:

1. **Node.js**: `v18.x` or higher installed on your system.
2. **MongoDB**: Local MongoDB instance running or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud database cluster.
3. **Cloudinary Account**: Cloud name, API key, and secret for handling media file uploads.
4. **SMTP Server / Gmail App Password**: Gmail account with 2-Factor Authentication and an App Password enabled (or an alternative SMTP service like SendGrid, Mailgun, etc.) for email verification.

---

## Installation Steps

1. **Navigate to the Backend Directory**:
   ```bash
   cd quran-online-academy/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file and update it with your configuration:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to set your MongoDB connection string, JWT secrets, SMTP credentials, and Cloudinary parameters.

4. **Seed Initial Admin User**:
   Run the database seed script to generate the default admin account:
   ```bash
   npm run seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000` (or the `PORT` specified in your `.env`).

6. **Start Production Server**:
   ```bash
   npm start
   ```

---

## Environment Variables

The application relies on the following environment variables (defined in `.env`):

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port number for the Express server | `5000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/quran_online_academy` |
| `JWT_SECRET` | Secret key used for signing JWT tokens | `your_super_secret_jwt_key` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `SMTP_HOST` | Host address for SMTP email service | `smtp.gmail.com` |
| `SMTP_PORT` | Port for SMTP service (`587` for TLS, `465` for SSL) | `587` |
| `SMTP_USER` | Email address used for sending emails | `your_email@gmail.com` |
| `SMTP_PASS` | Password or App Password for SMTP authentication | `your_app_password` |
| `SMTP_FROM` | Default sender header for outgoing emails | `Quran Online Academy <no-reply@quranonlineacademy.com>` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |
| `INITIAL_ADMIN_USERNAME` | Username for seed script | `admin` |
| `INITIAL_ADMIN_PASSWORD` | Password for seed script | `AdminPassword123!` |
| `INITIAL_ADMIN_EMAIL` | Email address for seed script | `admin@quranonlineacademy.com` |

---

## Admin Seeding Instructions

The backend includes an automated seeding script to create an initial administrative user account.

To execute the seed script:
```bash
npm run seed
```

### Seeding Behavior:
- The script connects to the MongoDB database specified in `MONGODB_URI`.
- It checks whether an admin user with `INITIAL_ADMIN_USERNAME` already exists.
- If found, it logs a message stating the user already exists and exits cleanly without overwriting credentials.
- If not found, it creates the admin account using `INITIAL_ADMIN_USERNAME`, `INITIAL_ADMIN_EMAIL`, and `INITIAL_ADMIN_PASSWORD`.
- Passwords are automatically hashed using `bcryptjs` before being stored.

---

## API Endpoint Documentation

All endpoints are prefixed with `/api`. Protected routes require a valid JWT token sent in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

### Health Check

#### `GET /api/health`
- **Access:** Public
- **Description:** Verifies server status and MongoDB connectivity.
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Quran Online Academy API is healthy",
    "timestamp": "2026-09-02T14:33:00.000Z",
    "environment": "development"
  }
  ```

---

### Authentication (`/api/auth`)

#### `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "username": "admin", // Or "email": "admin@quranonlineacademy.com"
    "password": "AdminPassword123!"
  }
  ```
- **Description:** Authenticates admin credentials and returns a JWT token.

#### `POST /api/auth/verify-email`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Description:** Generates a 6-digit OTP code, stores it with a 10-minute expiration, and emails it to the recipient.

#### `POST /api/auth/verify-otp`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Description:** Validates the OTP code for email verification.

#### `GET /api/auth/me`
- **Access:** Private (Admin)
- **Description:** Returns profile details for the currently logged-in admin user.

---

### Blog Posts (`/api/blog-posts`)

#### `GET /api/blog-posts`
- **Access:** Public
- **Query Parameters:**
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `category` (string, optional filter)
  - `include_drafts` (boolean, set to `true` to include unpublished posts)
- **Description:** Lists blog posts with pagination and optional filtering.

#### `GET /api/blog-posts/:slug`
- **Access:** Public
- **Description:** Retrieves a single blog post by its unique URL slug or MongoDB ObjectId.

#### `POST /api/blog-posts`
- **Access:** Private (Admin)
- **Request Body:**
  ```json
  {
    "title": "Benefits of Learning Tajweed",
    "excerpt": "Short summary of the article",
    "content": "Full post content in HTML or Markdown",
    "image_url": "https://res.cloudinary.com/...",
    "category": "Tajweed",
    "author": "Ustaz Abdul Muhaymin",
    "is_published": true
  }
  ```
- **Description:** Creates a new blog post and automatically generates a unique URL slug.

#### `PUT /api/blog-posts/:id`
- **Access:** Private (Admin)
- **Description:** Updates an existing blog post by ID.

#### `DELETE /api/blog-posts/:id`
- **Access:** Private (Admin)
- **Description:** Deletes a blog post by ID.

---

### Contact Messages (`/api/contact`)

#### `POST /api/contact`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry about trial class",
    "message": "Assalamu Alaikum, I would like to schedule a trial class."
  }
  ```
- **Description:** Submits a contact inquiry form.

#### `GET /api/contact`
- **Access:** Private (Admin)
- **Query Parameters:** `is_read` (`true` / `false`)
- **Description:** Retrieves all submitted contact messages.

#### `GET /api/contact/:id`
- **Access:** Private (Admin)
- **Description:** Gets details of a specific contact message.

#### `PUT /api/contact/:id`
- **Access:** Private (Admin)
- **Request Body:** `{ "is_read": true }`
- **Description:** Updates contact message status (e.g., mark as read).

#### `DELETE /api/contact/:id`
- **Access:** Private (Admin)
- **Description:** Deletes a contact message record.

---

### Courses (`/api/courses`)

#### `GET /api/courses`
- **Access:** Public
- **Query Parameters:** `include_inactive=true`
- **Description:** Lists active courses sorted by order position.

#### `GET /api/courses/:id`
- **Access:** Public
- **Description:** Retrieves course details by ID.

#### `POST /api/courses`
- **Access:** Private (Admin)
- **Request Body:**
  ```json
  {
    "title": "Basic Qaida",
    "description": "Learn basic Arabic alphabet and pronunciation rules.",
    "image_url": "https://res.cloudinary.com/...",
    "duration": "3 Months",
    "level": "Beginner",
    "is_active": true,
    "order": 1
  }
  ```
- **Description:** Adds a new course to the curriculum.

#### `PUT /api/courses/:id`
- **Access:** Private (Admin)
- **Description:** Updates course details.

#### `DELETE /api/courses/:id`
- **Access:** Private (Admin)
- **Description:** Deletes a course.

---

### Fee Packages (`/api/fee-packages`)

#### `GET /api/fee-packages`
- **Access:** Public
- **Query Parameters:** `include_inactive=true`
- **Description:** Lists available fee and class frequency packages.

#### `GET /api/fee-packages/:id`
- **Access:** Public
- **Description:** Retrieves fee package details by ID.

#### `POST /api/fee-packages`
- **Access:** Private (Admin)
- **Request Body:**
  ```json
  {
    "name": "5 Days a Week",
    "price": 40,
    "days_per_week": 5,
    "classes_per_month": 20,
    "duration_per_class": "30 mins",
    "features": ["1-on-1 Classes", "Flexible Timing", "Monthly Reports"],
    "is_popular": true,
    "is_active": true,
    "order": 1
  }
  ```
- **Description:** Creates a new fee package option.

#### `PUT /api/fee-packages/:id`
- **Access:** Private (Admin)
- **Description:** Updates fee package configuration.

#### `DELETE /api/fee-packages/:id`
- **Access:** Private (Admin)
- **Description:** Deletes a fee package option.

---

### Payment Methods (`/api/payment-methods`)

#### `GET /api/payment-methods`
- **Access:** Public
- **Query Parameters:** `include_inactive=true`
- **Description:** Lists available payment methods (e.g. Bank Transfer, JazzCash, Western Union).

#### `GET /api/payment-methods/:id`
- **Access:** Public
- **Description:** Gets specific payment method details.

#### `POST /api/payment-methods`
- **Access:** Private (Admin)
- **Request Body:**
  ```json
  {
    "name": "Bank Alfalah",
    "account_title": "Quran Online Academy",
    "account_number": "1234567890",
    "instructions": "Please transfer payment and upload screenshot during registration.",
    "icon": "https://res.cloudinary.com/...",
    "is_active": true
  }
  ```
- **Description:** Creates a new payment method option.

#### `PUT /api/payment-methods/:id`
- **Access:** Private (Admin)
- **Description:** Updates payment method details.

#### `DELETE /api/payment-methods/:id`
- **Access:** Private (Admin)
- **Description:** Deletes a payment method.

---

### Site Settings (`/api/settings`)

#### `GET /api/settings`
- **Access:** Public
- **Description:** Returns all site configuration settings alongside a key-value `settings_map`.

#### `GET /api/settings/:key`
- **Access:** Public
- **Description:** Retrieves a setting by its `setting_key` identifier.

#### `POST /api/settings`
- **Access:** Private (Admin)
- **Request Body:**
  ```json
  {
    "setting_key": "contact_whatsapp",
    "setting_value": "+923177479286",
    "setting_type": "text"
  }
  ```
- **Description:** Upserts (creates or updates) a setting by key.

#### `PUT /api/settings/:id`
- **Access:** Private (Admin)
- **Description:** Updates a setting record by ID.

#### `DELETE /api/settings/:id`
- **Access:** Private (Admin)
- **Description:** Removes a site setting.

---

### Student Registrations (`/api/students`)

#### `POST /api/students/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "student_name": "Aisha Rahman",
    "father_name": "Abdul Rahman",
    "email": "aisha@example.com",
    "whatsapp": "+1234567890",
    "country": "United States",
    "course": "Tajweed Course",
    "package": "5 Days a Week",
    "payment_method": "Bank Alfalah",
    "payment_screenshot": "https://res.cloudinary.com/...",
    "notes": "Prefers evening slot (US EST)"
  }
  ```
- **Description:** Submits student registration for admission.

#### `GET /api/students`
- **Access:** Private (Admin)
- **Query Parameters:** `status` (`pending`, `approved`, `rejected`)
- **Description:** Lists registered students filterable by status.

#### `GET /api/students/:id`
- **Access:** Private (Admin)
- **Description:** Retrieves student registration details.

#### `PUT /api/students/:id`
- **Access:** Private (Admin)
- **Request Body:** `{ "status": "approved", "notes": "Class scheduled for Mon/Wed/Fri" }`
- **Description:** Updates student application status or notes.

#### `DELETE /api/students/:id`
- **Access:** Private (Admin)
- **Description:** Deletes a student registration record.

---

### File Uploads (`/api/upload`)

#### `POST /api/upload`
- **Access:** Public
- **Content-Type:** `multipart/form-data`
- **Form Fields:**
  - `file` (File, required, max size 5MB, image types only)
  - `folder` (string, optional, default: `quran_academy`)
- **Description:** Uploads an image asset to Cloudinary and returns image metadata and secure URL.
- **Response Example:**
  ```json
  {
    "success": true,
    "url": "https://res.cloudinary.com/your_cloud_name/image/upload/v12345678/quran_academy/sample.jpg",
    "public_id": "quran_academy/sample",
    "format": "jpg",
    "bytes": 204850
  }
  ```

---

## Deployment Instructions

### Deploying to Railway

1. **Create Railway Project**:
   - Log in to [Railway](https://railway.app/).
   - Click **New Project** -> **Deploy from GitHub repo**.
   - Select your repository and set the root directory to `quran-online-academy/backend`.

2. **Configure Environment Variables**:
   - In Railway, navigate to the **Variables** tab.
   - Add all environment variables listed in the [Environment Variables](#environment-variables) table:
     - `PORT` (Railway automatically assigns `PORT`, but you can leave default)
     - `NODE_ENV=production`
     - `MONGODB_URI` (Your production MongoDB Atlas connection string)
     - `JWT_SECRET`, `JWT_EXPIRES_IN`
     - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
     - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
     - `INITIAL_ADMIN_USERNAME`, `INITIAL_ADMIN_PASSWORD`, `INITIAL_ADMIN_EMAIL`

3. **Configure Build & Start Commands**:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Run Admin Seed**:
   - Open the Railway **CLI / Terminal** tab or run locally targeting the remote MongoDB database:
     ```bash
     npm run seed
     ```

---

### Deploying to Render

1. **Create Web Service**:
   - Log in to [Render](https://render.com/).
   - Click **New +** -> **Web Service**.
   - Connect your Git repository.

2. **Configure Service Settings**:
   - **Name:** `quran-academy-backend`
   - **Root Directory:** `quran-online-academy/backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js` (or `npm start`)

3. **Set Environment Variables**:
   - In the **Environment** section, add your production environment variables (`MONGODB_URI`, `JWT_SECRET`, `SMTP_*`, `CLOUDINARY_*`, etc.).

4. **Deploy Service**:
   - Click **Create Web Service**. Render will build and deploy the application.
   - Verify deployment using the health check endpoint at `https://<your-render-app>.onrender.com/api/health`.

5. **Run Database Seed**:
   - Use Render Shell to run `npm run seed` or run `npm run seed` locally with the production `MONGODB_URI`.
