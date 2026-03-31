# ==========================================
# Phase 1: Builder
# ==========================================
FROM oven/bun:alpine AS builder

WORKDIR /app

# Copy dependency files and install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the source code
COPY . .

# Build the entire application into a single lightweight JavaScript bundle
RUN bun build ./src/app.ts --target bun --outfile dist/app.js


# ==========================================
# Phase 2: Production Runner
# ==========================================
FROM oven/bun:alpine AS runner

WORKDIR /app

# Only copy the final compiled application from the builder stage
# This discards all source files and the bulky node_modules directory!
COPY --from=builder /app/dist/app.js ./app.js

# Create a volume directory for the SQLite database
RUN mkdir -p /data
VOLUME /data

# Configure our database path environment variable
ENV DB_PATH=/data/adhancal.db
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the compiled bundle natively
CMD ["bun", "run", "app.js"]
