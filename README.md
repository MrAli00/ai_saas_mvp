# BlogPulse AI SaaS MVP

BlogPulse is a simple AI-powered SaaS MVP with a Next.js frontend and a Node.js backend. It provides a small landing experience and API routes for content generation and checkout-related flows.

## Project structure

- blogpulse-frontend/: Next.js app
- blogpulse-backend/: Node.js server

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or higher
- npm
- Git

## Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd ai_saas_mvp
   ```

2. Install frontend dependencies
   ```bash
   cd blogpulse-frontend
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../blogpulse-backend
   npm install
   ```

## Environment variables

Create a `.env` or `.env.local` file in the relevant folder if your app needs secrets such as API keys.

Example:

```env
OPENROUTER_API_KEY=your_key_here
```

> Do not commit your real environment files. They are intentionally excluded by the repository ignore rules.

## Running the project

Start the backend:

```bash
cd blogpulse-backend
node server.js
```

Start the frontend:

```bash
cd ../blogpulse-frontend
npm run dev
```

Then open:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Features

- Modern landing page
- Pricing page
- AI generation API route
- Checkout API route

## Notes

This project is intended as a starter MVP and can be expanded with authentication, database storage, and production deployment setup.
