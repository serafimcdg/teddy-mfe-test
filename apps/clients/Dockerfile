
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install && pnpm --filter ./apps/clients build

FROM nginx:alpine
COPY --from=builder /app/apps/clients/dist /usr/share/nginx/html
COPY apps/clients/public/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
