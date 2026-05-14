FROM node:22-alpine AS build
WORKDIR /app
ENV PUBLIC_ENABLE_ADS=true
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/build /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 8080
