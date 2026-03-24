# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG GITHUB_TOKEN
ARG GITHUB_USERNAME
ARG NEXT_PUBLIC_GITHUB_USERNAME
ARG NEXT_PUBLIC_PORTFOLIO_TAG
ARG PORTFOLIO_TAG
ARG WAKATIME_API_KEY

ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV GITHUB_USERNAME=$GITHUB_USERNAME
ENV NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME
ENV NEXT_PUBLIC_PORTFOLIO_TAG=$NEXT_PUBLIC_PORTFOLIO_TAG
ENV PORTFOLIO_TAG=$PORTFOLIO_TAG
ENV WAKATIME_API_KEY=$WAKATIME_API_KEY

RUN npm run build

# Stage 3: Production runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
