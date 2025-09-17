# Dating App

Welcome to the Dating App! This is a modern, full-stack dating application built with Next.js, TypeScript, and Tailwind CSS. It provides a platform for users to connect with potential partners in a seamless and engaging way.

## Features

- **User Authentication**: Secure sign-up and login functionality using NextAuth.js.
- **User Profiles**: Create and customize user profiles with photos and personal information.
- **Swiping Interface**: A familiar, intuitive swiping mechanism to like or dislike potential matches.
- **Real-time Chat**: Engage in real-time conversations with matched users.
- **Advanced Filtering**: Filter potential partners based on various criteria like age, location, and interests.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - A React framework for building full-stack web applications.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) and [DaisyUI](https://daisyui.com/) - for beautiful and accessible UI components.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for type-safe form validation.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - for handling user authentication.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for object data modeling.
- **File Uploads**: [UploadThing](https://uploadthing.com/) for easy file uploads.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [bun](https://bun.com/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yasshrai/datingapp.git
   cd datingapp
   ```

2. **Install dependencies:**
   ```sh
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of your project and add the necessary environment variables.

   ```env
   # Example environment variables
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   ```

4. **Run the development server:**
   ```sh
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `bun dev`: Runs the app in development mode.


## Deployment

This application is ready to be deployed on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
