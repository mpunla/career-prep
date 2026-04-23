# Career Prep

An AI-powered job preparation tool that helps users practice interviews, answer technical questions, and tailor their resumes based on uploaded job descriptions.
**Live Demo**: [https://career-prep-one.vercel.app/](https://career-prep-one.vercel.app/)

## Features

- **Interview Practice**: Engage in voice-based mock interviews with Hume AI for realistic conversation simulations. Get AI-powered feedback to improve your responses and confidence.
- **Technical Questions**: Get instant answers and explanations for technical questions across various domains.
- **Resume Tailoring**: Upload job descriptions and receive personalized resume suggestions to match specific roles.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, Shadcn UI components
- **AI Integration**: Vercel AI SDK, Hume AI for voice chat
- **Security**: Arcjet for application security
- **Authentication**: Clerk for user management
- **Database**: Drizzle ORM with PostgreSQL

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mpunla/career-prep.git
   cd career-prep
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `env.example` to `.env`
   - Fill in the required environment variables (API keys, database URLs, etc.)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to start using Career Prep.

## Usage

1. Sign up or log in using Clerk authentication.
2. Upload job information to get started.
3. Practice interviews, answer technical questions, or tailor your resume.
