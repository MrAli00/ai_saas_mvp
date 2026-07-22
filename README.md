# BlogPulse AI SaaS MVP

BlogPulse is a lightweight AI-powered SaaS MVP built with a Next.js frontend and a Node.js backend. It includes a modern landing page, pricing view, and simple API routes for content generation and checkout-related logic.

## Project screenshot

You can showcase the app with screenshots of:

- the landing page
- the pricing page
- the generated content flow

Add your screenshots to a folder such as `docs/screenshots/` and reference them here.

## Project structure

- blogpulse-frontend/: Next.js application
- blogpulse-backend/: Node.js server
- README.md: project instructions
- LICENSE: MIT license

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

## Deployment instructions

### Local deployment

Use the same steps above to run the app locally during development.

### Production deployment

You can deploy the frontend and backend separately to platforms such as:

- Vercel for the Next.js frontend
- Render, Railway, or Fly.io for the Node.js backend

Recommended deployment checklist:

1. Set environment variables in the hosting platform
2. Configure the frontend API base URL to point to the deployed backend
3. Enable HTTPS and set production domain values
4. Build and deploy the frontend with `npm run build`

## Features

- Modern landing page
- Pricing page
- AI generation API route
- Checkout API route

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Notes

This project is intended as a starter MVP and can be expanded with authentication, database storage, and production deployment setup.
