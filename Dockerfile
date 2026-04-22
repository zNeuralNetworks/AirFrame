FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run lint
RUN npm run build

FROM node:22-slim AS runtime

ENV NODE_ENV=production
ENV PORT=8080
ENV AIRFRAME_DB_PATH=/tmp/airframe/database.json

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server

USER node

EXPOSE 8080

CMD ["npm", "run", "start"]
