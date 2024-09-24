# Zauto AI

<img src="/public/sc1.png"  width="700px"/>

Zauto AI is a web application built with Next.js 15, TypeScript, Prisma ORM, and Neon PostgreSQL. The application allows users to manage patient records with two main functionalities:
1. **Create a new patient** in the database.
2. **Retrieve patient records**, either specific or all patients from the database.

## Image
<img src="/public/sc2.png"  width="700px"/>
<img src="/public/sc3.png"  width="700px"/>
<img src="/public/wall.png"  width="700px"/>

## Features

- **Create New Patient**: Add a new patient record to the database via a form.
- **Get Patient Information**: Fetch and display all patients or a specific patient using an identifier.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/docs)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Neon PostgreSQL](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)

## Prerequisites

- Node.js v18+
- PostgreSQL (Neon)
- Yarn or npm (for package management)
- Prisma CLI

## Installation

Follow these steps to set up the project locally.

### 1. Clone the repository:

```bash
git clone https://github.com/awesome-pro/abhinandan-v.git
cd abhinandan-v
```

### 2. Install dependencies:

```bash
# Using npm
npm install

# Or using yarn
bun install
```

### 3. Set up environment variables:

Create a `.env` file in the root of the project and add the following environment variables:

```
DATABASE_URL=postgresql://<your-database-url>
```

Replace `<your-database-url>` with your actual Neon PostgreSQL connection string.

### 4. Set up the database:

Run Prisma commands to initialize and migrate the database schema:

```bash
npx prisma db push
npx prisma migrate dev
```

This will set up the database schema in Neon PostgreSQL.

### 5. Start the development server:

```bash
# Using npm
npm run dev

# Or using yarn
bun run dev
```

Your Next.js app should now be running at [http://localhost:3000](http://localhost:3000).

## File Structure

```
zauto-ai/
│
├── prisma/                   # Prisma schema and migrations
│   └── schema.prisma         # Prisma schema definition
│
├── app/                      # Next.js application
│   ├── (backend)/                # API routes
│   │   └── api/              # API routes
│   │       └── patient/      # API routes for patients
│   │           └── route.ts  # API route handlers
│   │--(frontend)/            # React components
│   │   └── create-patient/   # Create new patient form
│   |        └── page.tsx     # Create patient page
│   │   └── get-patient/      # Fetch patient records
│   |        └── page.tsx     # Fetch patient page
│── components/               # React components
|--lib/                       # Utility functions
│   └── util.ts              
│--public/                    # Public assets
│   └── sc1.png
│   └── sc2.png
│   └── sc3.png
│   └── wall.png
│   └── favicon.ico
│--
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project metadata and dependencies
```

## Pages Overview

### 1. Create New Patient

Located at `/create-patient`, this page contains a form to add a new patient to the Neon PostgreSQL database. Users can input details like name, age, and medical history. Upon submission, the data is sent to the backend API and saved in the database.

### 2. Fetch Patients

Located at the home page `/`, this page allows users to:
- Fetch all patient records.
- Search for a specific patient using an identifier (e.g., patient ID).

## API Routes

The API routes are defined under `src/pages/api/patients.ts` and handle the following requests:

- `GET /api/patients`: Fetch all patients or a specific patient by query parameter.
- `POST /api/patients`: Create a new patient.

## Running Prisma Studio

To visually manage the database, Prisma Studio can be used:

```bash
npx prisma studio
```

This opens a web interface for managing the data in your PostgreSQL database.

## Deployment

You can deploy this Next.js application on [Vercel](https://vercel.com/) or any platform that supports Node.js and PostgreSQL.

### 1. Deploy on Vercel

Simply link your GitHub repository to Vercel and set the environment variables in the Vercel dashboard, including the `DATABASE_URL`.

### 2. Set Up Database on Neon PostgreSQL

Ensure that your Neon PostgreSQL database is accessible from the deployed environment. You might need to adjust security settings or provide a connection string with the correct IPs for external access.

## License

This project is licensed under the MIT License.

---

Let me know if you'd like to add or modify any details!