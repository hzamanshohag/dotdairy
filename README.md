# নওগাঁর প্যারা সন্দেশ | Naogaon Para Sandesh

A responsive website for showcasing and ordering Naogaon's traditional **প্যারা সন্দেশ (Para Sandesh)**. The interface uses Bengali content, a maroon-and-cream color palette, product-focused navigation, and a customer testimonial carousel.

## Features

- **Responsive navigation** for desktop and mobile devices
- **Bengali-language interface** for a localized customer experience
- **Brand logo** in the sticky navigation bar
- **Section-based navigation** for About, Products, Why Us, Testimonials, and Order
- **Order call-to-action** links that direct visitors to the order section
- **Customer testimonials** with customer images, star ratings, navigation dots, and previous/next controls
- **Smooth testimonial carousel** with one-card-at-a-time navigation, responsive card widths, and autoplay
- **Responsive layout** styled with Tailwind CSS
- **Optimized images** using Next.js Image

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Styling and responsive layouts
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [NextAuth.js](https://next-auth.js.org/) - Authentication and session management
- [Cloudinary](https://cloudinary.com/) - Image and media management
- [Lucide React](https://lucide.dev/) - Interface icons

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and a package manager such as npm, pnpm, or yarn.

### 1. Clone the repository

```bash
git clone <https://github.com/hzamanshohag/dotdairy.git>
cd <dotdairy>
```

Replace the placeholders with your repository URL and project directory.

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or, if the project uses pnpm:

```bash
pnpm install
```

### 3. Start the development server

Using npm:

```bash
npm run dev
```

Or, with pnpm:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

The exact scripts depend on the project's `package.json`. A typical Next.js project includes:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production application |
| `npm run start` | Run the production build |
| `npm run lint` | Run linting, if configured |

Check `package.json` to confirm which scripts are available.

## Project Structure

A typical App Router layout may look like this:

```text
project-root/
├── public/
│   ├── img/
│   │   └── logo.svg
│   └── images/
│       └── reviews/
│           ├── user-1.jpg
│           ├── user-2.jpg
│           ├── user-3.jpg
│           └── user-4.jpg
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

> This is an illustrative structure. Adjust it to match your actual repository. Components may be stored in a separate `components/` directory or elsewhere.


## Customization

- **Brand colors:** The current interface uses maroon (`#5b0909`), red (`#ed1c24` / `#e31b23`), cream (`#fffaf0`), and gold (`#f2c94c`).
- **Navigation:** Edit the `navLinks` array in the Navbar component.
- **Testimonials:** Edit the `testimonials` array to change customer names, reviews, and image paths.
- **Carousel behavior:** Adjust the transition duration and autoplay interval in the Testimonials component.

## Production Build

Create a production build:

```bash
npm run build
```

If the build succeeds, start it locally with:

```bash
npm run start
```
