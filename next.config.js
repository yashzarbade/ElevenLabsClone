// {
//   "name": "ELEVENLABS",
//   "version": "0.1.0",
//   "private": true,
//   "scripts": {
//     "dev": "next dev",
//     "build": "next build",
//     "start": "next start",
//     "lint": "next lint"
//   },
//   "dependencies": {
//     "@types/node": "^20",
//     "@types/react": "^18",
//     "@types/react-dom": "^18",
//     "next": "14.0.0",
//     "react": "^18",
//     "react-dom": "^18",
//     "tailwindcss": "^3.3.0",
//     "autoprefixer": "^10.0.1",
//     "postcss": "^8",
//     "lucide-react": "^0.263.1",
//     "typescript": "^5",
//     "mongodb": "^6.3.0"
//   },
//   "devDependencies": {
//     "eslint": "^8",
//     "eslint-config-next": "14.0.0",
//     "@types/mongodb": "^4.0.7"
//   }
// }


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['elevenlabs.io'], // Add any external image domains
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
}

module.exports = nextConfig