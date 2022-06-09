FROM node:16 AS ui-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN  npm install
COPY frontend/public ./public
COPY frontend/src ./src
RUN npm run build

FROM node:16 AS server-build

WORKDIR /app/

COPY --from=ui-build /app/frontend/build ./frontend/build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# CMD ["node","./bin/www"]
