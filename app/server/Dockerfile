FROM node:20-slim

# Install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy compiled server code
COPY dist ./dist

# Create temp directory for uploads
RUN mkdir -p /app/tmp

# Environment
ENV NODE_ENV=production
ENV PORT=4000
ENV TMP_DIR=/app/tmp

# Expose internal port
EXPOSE 4000

# Start server
CMD ["node", "dist/index.js"]