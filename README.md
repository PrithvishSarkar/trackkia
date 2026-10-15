# Trackkia

**Trackkia** is a full-stack task management application built as a PERN-stack project.  
It goes beyond a simple to-do list by offering user authentication, task prioritization, status tracking, real-time previews, pagination, analytics dashboards, password recovery via OTP, and a polished light/dark theme experience.

## Features

### Authentication & Security

- User registration with strong password validation
- Secure login with JWT stored in HTTP-only cookies
- Password hashing with **bcryptjs**
- Forgot-password flow with OTP sent via email (Nodemailer)
- OTP verification + password reset
- Protected routes with authentication middleware
- Global error handling middleware
- Helmet + CORS for security headers

### Task Management

- Add tasks with:
  - Title (max 50 characters)
  - Description (max 100 characters)
  - Priority (Low / Medium / High)
  - Deadline (date picker)
- Real-time **Task Card preview** while filling the form
- View all tasks (newest first) with **pagination**
- Update task status: **Pending → In Progress → Completed**
- Edit tasks (modal with pre-filled form) and delete tasks
- Instant UI feedback with React Toastify

### Analytics Dashboard

- Two interactive pie charts powered by **Recharts**:
  - **Task Status** distribution (Pending / In Progress / Completed)
  - **Task Priority** distribution (Low / Medium / High)

### UI / UX

- Light / Dark theme toggle (persisted)
- Fully responsive design (mobile hamburger menu)
- Loading spinners on all critical actions
- Clean, modern UI with React Bootstrap + CSS Modules

## Tech Stack

### Frontend

| Technology              | Purpose                          |
|-------------------------|----------------------------------|
| Vite                    | Build tool                       |
| React 19                | UI library                       |
| TypeScript              | Type safety                      |
| React Router            | Client-side routing              |
| React-Redux + RTK       | State management                 |
| React Bootstrap         | UI components                    |
| React Toastify          | Notifications                    |
| Recharts                | Analytics charts                 |
| CSS Modules             | Scoped styling                   |

### Backend

| Technology              | Purpose                          |
|-------------------------|----------------------------------|
| Express.js              | Web framework                    |
| TypeScript              | Type safety                      |
| PostgreSQL (Supabase)   | Database                         |
| Drizzle ORM             | Database ORM                     |
| bcryptjs                | Password hashing                 |
| jsonwebtoken (JWT)      | Authentication                   |
| Nodemailer              | Email / OTP delivery             |
| Helmet + CORS           | Security                         |
| dotenv                  | Environment variables            |

### Architecture

- **MVC** pattern
- RESTful API design
- Authentication & Error Handling middleware
- Cookie-based JWT sessions

## Getting Started

### Prerequisites

- Node.js (v24 or higher recommended)
- npm (v12 or higher recommended)
- PostgreSQL database (or Supabase account)
- Gmail account (or any SMTP service) for OTP emails

### 1. Clone the repository

```bash
git clone https://github.com/PrithvishSarkar/trackkia.git
cd trackkia
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
DB_TRANSACTION_POOLER_URL=<your_supabase_transaction_pooler_url>
DB_SESSION_POOLER_URL=<your_supabase_session_pooler_url>
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=<your_super_secret_jwt_key>
EMAIL_SENDER=<your_email@gmail.com>
APP_PASSWORD=<your_gmail_app_password>
SMTP_SERVER=gmail
```

> **Note:** Generate a Gmail App Password if using Gmail (Account → Security → 2-Step Verification → App passwords).

Run the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:4000/api/v1
VITE_REGISTER_API_PATH=/auth/register
VITE_LOGIN_API_PATH=/auth/login
VITE_LOGOUT_API_PATH=/auth/logout
VITE_GET_USERNAME_PATH=/auth/user-name
VITE_SEND_OTP_PATH=/auth/send-otp
VITE_RESEND_OTP_PATH=/auth/resend-otp
VITE_VERIFY_OTP_PATH=/auth/verify-otp
VITE_RESET_PWD_PATH=/auth/reset-password
VITE_ADD_TASK_PATH=/task/add-task
VITE_EDIT_TASK_PATH=/task/edit-task
VITE_ALL_TASK_PATH=/task/all-tasks
VITE_DELETE_TASK_PATH=/task/delete-task
VITE_EDIT_STATUS_PATH=/task/edit-status
VITE_ANALYTICS_PATH=/task/analytics
```

Run the frontend:

```bash
npm run dev
```

> The app will be available at `http://localhost:5173`.

## Password Requirements

When registering or resetting a password, follow the following rules:

- Minimum **8 characters** without spaces
- Must contain **uppercase** and **lowercase** letters
- Must contain at least **one number**
- Must contain at least **one special character**

## API Overview (Protected routes require valid JWT cookie)

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/auth/register`              | Register new user               |
| POST   | `/auth/login`                 | Login existing user             |
| POST   | `/auth/logout`                | Logout (clears cookie)          |
| GET    | `/auth/username`              | Get current username            |
| POST   | `/auth/send-otp`              | Send OTP for password reset     |
| POST   | `/auth/resend-otp`            | Resend OTP                      |
| POST   | `/auth/verify-otp`            | Verify OTP                      |
| POST   | `/auth/reset-password`        | Reset password                  |
| POST   | `/task/add-task`              | Create a new task               |
| GET    | `/task/all-task`              | Get all tasks (paginated)       |
| PATCH  | `/task/edit-task`             | Edit a task                     |
| PATCH  | `/task/edit-status`           | Update task status              |
| DELETE | `/task/delete-task`           | Delete a task                   |
| GET    | `/task/analytics`             | Get status & priority analytics |

## Deployment

### Backend → Render

1. Create a new **Web Service** on Render
2. Connect the GitHub repository
3. Set the root directory to `Backend`
4. Add all the environment variables listed above
5. Build command: `npm install --include=dev && npm run build`
6. Start command: `npm start`

### Frontend → Vercel

1. Import the GitHub repository on Vercel
2. Set the root directory to `Frontend`
3. Add all `VITE_*` environment variables
4. Choose framework preset as **Vite**
5. Click on "Deploy" button to deploy

> After deployment, update `FRONTEND_URL` on the backend and `VITE_BACKEND_URL` on the frontend to the production URLs.
