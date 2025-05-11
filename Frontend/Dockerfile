# Install dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve with a lightweight server
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "out"]
