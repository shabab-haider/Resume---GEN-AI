# BackEnd API Documentation

This folder contains the Express + MongoDB backend for the Resume - GEN AI project.

## Why a Backend README?

Yes, this is a professional practice.  
A backend-specific README helps other developers quickly understand:

- how to run the API
- required environment variables
- authentication behavior
- endpoint contracts (request/response)

## Base URL

Local API base URL:

`http://localhost:3000`

All routes are mounted under:

- `/api/auth`
- `/api/interview`

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (cookie-based auth)
- Multer (file upload)
- pdf-parse
- Google Gemini API (`@google/genai`)
- Puppeteer (resume PDF generation)

## Setup

1) Install dependencies:

```bash
npm install
```

2) Create `.env` in `BackEnd/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

3) Start server:

```bash
node server.js
```

Server runs on port `3000`.

## Authentication

- JWT is set in cookie key: `token`
- Protected routes require a valid non-blacklisted token cookie
- Logout blacklists the current token

## API Endpoints

### Auth Routes

#### `POST /api/auth/register`

Create a new user.

Request body:

```json
{
  "username": "shabab",
  "email": "you@example.com",
  "password": "your_password"
}
```

Success response (`200`):

```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "username": "shabab",
    "email": "you@example.com"
  }
}
```

#### `POST /api/auth/login`

Login existing user and set auth cookie.

Request body:

```json
{
  "email": "you@example.com",
  "password": "your_password"
}
```

Success response (`200`):

```json
{
  "messgae": "user loggedIn successfully",
  "user": {
    "id": "user_id",
    "email": "you@example.com",
    "username": "shabab"
  }
}
```

#### `GET /api/auth/logout`

Logout and blacklist current token.

Success response (`200`):

```json
{
  "message": "user logged out successfully"
}
```

#### `GET /api/auth/get-me` (Protected)

Get current logged-in user details.

Success response (`200`):

```json
{
  "message": "user details fetched successfully",
  "user": {
    "id": "user_id",
    "email": "you@example.com",
    "username": "shabab"
  }
}
```

---

### Interview Routes

#### `POST /api/interview` (Protected)

Generate and store interview report from uploaded resume + descriptions.

Content-Type: `multipart/form-data`

Form fields:

- `resume` (file, expected PDF; max 3MB in backend config)
- `selfDescription` (text)
- `jobDescription` (text)

Success response (`201`):

```json
{
  "message": "interview report genrated successfully",
  "interviewReport": {
    "_id": "report_id",
    "title": "Software Engineer",
    "matchScore": 78,
    "technicalQuestions": [],
    "behavioralQuestions": [],
    "skillGaps": [],
    "preparationPlan": []
  }
}
```

#### `GET /api/interview/report/:reportId` (Protected)

Get one report by ID for logged-in user.

Success response (`200`):

```json
{
  "message": "report found successfully",
  "interviewReport": []
}
```

Note: current implementation returns `interviewReport` as an array.

#### `GET /api/interview/allReports` (Protected)

Get all reports for current user (sorted by newest first).

Success response (`200`):

```json
{
  "message": "reports fetcehd sucessfully",
  "interviewReports": []
}
```

#### `GET /api/interview/generateResumePdf/:reportId` (Protected)

Generate and download resume PDF from report context.

Success response:

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename=resume_<reportId>.pdf`

## Error Responses (Common)

- `400` - Validation/login/upload issues
- `401` - Missing/invalid/blacklisted token
- `404` - Report not found
- `500` - Server/AI processing errors

## Notes

- CORS is currently configured for: `http://localhost:5173`
- File upload uses in-memory storage via Multer
- Keep `.env` secrets private and never commit real credentials

