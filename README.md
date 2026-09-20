# Coder Hub Website

The official website for the Coder Hub club, built with a modern stack focusing on performance, design, and a futuristic dark theme.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod, React Hook Form
- **Deployment**: Docker & Docker Compose

## Features
- Dynamic events page showing upcoming and past events.
- Join application form with client/server validation.
- Secure Admin Panel (`/admin`) for managing applications and events.
- Futuristic UI with glassmorphism and neon accents.

## How to Run Locally (Without Docker)
1. Ensure you have Node.js and PostgreSQL installed.
2. Clone the repository.
3. Install dependencies: `npm install`
4. Set up your `.env` file based on `.env.example`. Make sure `DATABASE_URL` points to your local Postgres instance.
5. Push the database schema: `npx prisma db push`
6. Seed the database: `npm run seed` (or `npx ts-node prisma/seed.ts`)
7. Start the development server: `npm run dev`
8. Open [http://localhost:3000](http://localhost:3000)

## How to Run with Docker (Recommended)
You can run the entire application, including the database, with a single command.
1. Make sure Docker and Docker Compose are installed.
2. In the root directory, run:
   ```bash
   docker compose up --build
   ```
3. The app will be available at [http://localhost:3000](http://localhost:3000). The database migrations and seeding will run automatically.

## How to Change Admin Credentials
Admin credentials are set via environment variables. By default, they are defined in the `docker-compose.yml` or `.env` file:
- `ADMIN_USERNAME` (default: `admin`)
- `ADMIN_PASSWORD` (default: `password`)
- `SESSION_SECRET` (used for signing cookies)

To change them, update your `.env` file or the `docker-compose.yml` environment section, and restart the server.

## How to Add Events
1. Go to `/admin/login` and log in with your admin credentials.
2. Navigate to the **Events** tab in the sidebar.
3. Click on the **Create Event** button.
4. Fill out the form (Title, Description, Date, Time, Venue, etc.) and submit.
5. The event will instantly appear on the Home and Events pages.

## How to Deploy on a VPS
1. SSH into your VPS and install Docker & Docker Compose.
2. Clone this repository onto your server.
3. Create a `.env` file in the project root with secure production credentials (especially `SESSION_SECRET` and `DATABASE_URL`).
4. Run `docker compose up -d --build` to start the app in detached mode.
5. Point your domain to the server's IP address (typically using a reverse proxy like Nginx or Traefik if you are running multiple services on port 80/443).
