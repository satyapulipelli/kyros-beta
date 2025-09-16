# KYROS - Flexible Gym Booking Platform

A modern landing page for KYROS, the gym booking platform that lets you book any gym, anywhere, anytime without subscriptions.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd kyros-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── ui/          # Reusable UI components
├── lib/             # Utility functions
├── assets/          # Images and static assets
├── App.jsx          # Main application component
├── App.css          # Global styles and Tailwind config
└── main.jsx         # Application entry point
```

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **shadcn/ui** - UI components

## Features

- Responsive design optimized for mobile and desktop
- Interactive survey modal for user feedback
- Email signup with form validation
- Modern UI with smooth animations
- Clean, conversion-focused layout

## Deployment

This project is optimized for deployment on:
- Vercel (recommended)
- Netlify
- GitHub Pages

Simply connect your repository to your preferred platform and deploy!
