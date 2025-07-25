# Web Widget

Web Widget is a plug-and-play JavaScript widget built using React, Vite, and Tailwind CSS that enables real-time online reservations for restaurants or services. Designed for seamless integration on any website, it connects to the Wegsoft backend to allow users to select dates, times, and table preferences.

## Deployment

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages. The configuration is in the `.cloudflare/pages.toml` file.

### Vercel

This project is also configured for deployment on Vercel. The configuration is in the `vercel.json` file.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment Script

You can use the included build script to build the project:

```bash
./build.sh
```