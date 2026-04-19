FROM node:18-alpine

WORKDIR /app

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV LOG_LEVEL=info

# Runtime variables (override with docker run -e)
ENV DATABASE_URL=""
ENV JWT_SECRET=""
