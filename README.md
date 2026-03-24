# Muhammad Haikal Baihaqi - Portfolio

My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, deployed on Vercel.

## Credits

This portfolio is built on top of [developer-portfolio](https://github.com/adamsnows/developer-portfolio) by [Adam Neves](https://github.com/adamsnows).

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Three.js
- **Deployment**: Vercel (serverless edge platform)
- **CI/CD**: GitHub Actions (lint → build → deploy to Vercel)
- **Monitoring**: Vercel Analytics + Vercel Speed Insights
- **Security**: Environment-based secrets, security headers, no hardcoded credentials

## Architecture

```
┌─────────────┐        ┌──────────────────────────────────┐
│   Client     │───────▶│            Vercel                 │
│  (Browser)   │        │  ┌────────────┐  ┌────────────┐  │
└─────────────┘        │  │  Next.js   │  │  Serverless │  │
                       │  │  (SSR/SSG) │  │  Functions  │  │
                       │  └────────────┘  └────────────┘  │
                       │  ┌────────────┐  ┌────────────┐  │
                       │  │ Analytics  │  │   Speed     │  │
                       │  │ Dashboard  │  │  Insights   │  │
                       │  └────────────┘  └────────────┘  │
                       └──────────────────────────────────┘
                                    │
┌──────────────────────────────────────────────────────────┐
│                    GitHub Actions                         │
│            Lint  ──▶  Build  ──▶  Deploy                 │
└──────────────────────────────────────────────────────────┘
```

## CI/CD Pipeline

The GitHub Actions pipeline runs automatically on every push to `main`:

1. **Lint** — runs ESLint to check code quality
2. **Build** — builds the Next.js application
3. **Deploy** — deploys to Vercel production using Vercel CLI

Pipeline config: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel API token (from vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel Organization ID |
| `VERCEL_PROJECT_ID` | Vercel Project ID |
| `GH_TOKEN` | GitHub personal access token (public_repo, read:user) |
| `GH_USERNAME` | GitHub username |
| `PORTFOLIO_TAG` | Tag to filter portfolio projects |
| `WAKATIME_API_KEY` | WakaTime API key |

## Deployment Setup

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Link Project to Vercel

```bash
vercel login
vercel link
```

This creates a `.vercel` folder with your `orgId` and `projectId`.

### 3. Set Environment Variables on Vercel

Go to your Vercel project dashboard → Settings → Environment Variables and add:

| Variable | Environment |
|---|---|
| `GITHUB_TOKEN` | Production |
| `GITHUB_USERNAME` | Production |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Production |
| `NEXT_PUBLIC_PORTFOLIO_TAG` | Production |
| `PORTFOLIO_TAG` | Production |
| `WAKATIME_API_KEY` | Production |

### 4. Configure GitHub Secrets

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add all secrets listed in the table above
3. Get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from `.vercel/project.json`
4. Get `VERCEL_TOKEN` from [vercel.com/account/tokens](https://vercel.com/account/tokens)

### 5. Push to Deploy

```bash
git push origin main
```

The CI/CD pipeline will automatically lint, build, and deploy to Vercel.

## Monitoring

### Vercel Analytics
- Built-in page view tracking and visitor analytics
- Available at: Vercel Dashboard → Project → Analytics tab
- Integrated via `@vercel/analytics` package

### Vercel Speed Insights
- Real-time Web Vitals monitoring (LCP, FID, CLS, TTFB)
- Available at: Vercel Dashboard → Project → Speed Insights tab
- Integrated via `@vercel/speed-insights` package

## Security Measures

- **No hardcoded secrets** — all sensitive values stored in Vercel environment variables and GitHub Secrets
- **Security headers** configured in `next.config.mjs`:
  - `X-Robots-Tag` for SEO control
  - `poweredByHeader: false` hides Next.js identifier
- **API rate limiting** via Vercel's built-in DDoS protection
- **HTTPS** enforced automatically by Vercel
- **Automatic scaling** handled by Vercel's serverless infrastructure

## Project Structure

```
├── .github/workflows/deploy.yml    # CI/CD pipeline
├── src/                             # Next.js source code
│   ├── components/                  # React components
│   ├── app/                         # Next.js app router
│   └── ...
├── public/                          # Static assets
├── nginx/                           # Nginx config (for VPS deployment)
├── monitoring/                      # Prometheus + Grafana (for VPS deployment)
├── docker-compose.yml               # Docker setup (for VPS deployment)
├── Dockerfile                       # Docker build (for VPS deployment)
├── vercel.json                      # Vercel configuration
├── next.config.mjs                  # Next.js configuration
└── .env.example                     # Environment variables template
```

## Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local
# Fill in the values in .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

[MIT](LICENSE)
