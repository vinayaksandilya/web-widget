# Web Widget

Web Widget is a plug-and-play JavaScript widget built using React, Vite, and Tailwind CSS that enables real-time online reservations for restaurants or services. Designed for seamless integration on any website, it connects to the Wegsoft backend to allow users to select dates, times, and table preferences.

## Deployment

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages. The configuration is in the `.cloudflare/pages.toml` file.

To deploy to Cloudflare Pages:

```bash
npm run deploy:cloudflare
```

### Vercel

This project is also configured for deployment on Vercel. The configuration is in the `vercel.json` file.

To deploy to Vercel:

```bash
npm run deploy:vercel
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment Scripts

The project includes specialized build scripts for different deployment platforms:

- `cloudflare-build.sh`: Optimized for Cloudflare Pages deployment
- `vercel-build.sh`: Optimized for Vercel deployment
- `build.sh`: General-purpose build script

These scripts handle the removal of yarn.lock and ensure proper npm-based builds.