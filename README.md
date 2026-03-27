# Resume - GEN AI

An AI-powered full-stack web application that helps users prepare for interviews by analyzing their resume and target job description, then generating a personalized interview strategy.

## Features

- User authentication (register, login, logout) with JWT in cookies
- Resume upload and parsing (PDF)
- AI-generated interview report including:
  - Match score
  - Technical questions with intention and answer guidance
  - Behavioral questions with intention and answer guidance
  - Skill gaps with severity
  - Day-wise preparation roadmap
- Report history for logged-in users
- AI resume generation and PDF download
- Shared top navigation across pages

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Sass
- Vite

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Multer
- pdf-parse
- Google Gemini API (`@google/genai`)
- Puppeteer

## Project Structure

```text
Resume - GEN AI/
  FrontEnd/   # React client
  BackEnd/    # Express API
```

## How It Works

1. User logs in and opens the Home page.
2. User provides a job description and uploads a resume (or adds a self-description).
3. Frontend sends data to backend interview endpoints.
4. Backend extracts resume text and prompts Gemini for structured output.
5. Generated report is saved to MongoDB and displayed on the Interview page.
6. User can review strategy sections and download a generated resume PDF.

## Local Setup

## 1) Clone

```bash
git clone <your-repo-url>
cd "Resume - GEN AI"
```

## 2) Backend setup

```bash
cd BackEnd
npm install
```

Create a `.env` file inside `BackEnd`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

Run backend server:

```bash
node server.js
```

Backend runs on `http://localhost:3000`.

## 3) Frontend setup

```bash
cd ../FrontEnd
npm install
```

Create a `.env` file inside `FrontEnd`:

```env
VITE_BASE_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Endpoints (High-Level)

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/auth/get-me`

### Interview

- `POST /api/interview` - Generate and store interview report
- `GET /api/interview/report/:reportId` - Get report by ID
- `GET /api/interview/allReports` - Get all reports for current user

## Notes

- Use valid API keys and database credentials in environment files.
- Do not commit real secrets to public repositories.
- Current backend CORS is set for local frontend origin (`http://localhost:5173`).

## Future Improvements

- Add stronger server-side validation and error handling
- Add loading and error toasts in UI
- Add unit/integration tests
- Add CI workflow (lint + build checks)
- Add production deployment guide

## Author

Syed Shabab Haider