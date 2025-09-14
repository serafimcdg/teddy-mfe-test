FROM node:20-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install
EXPOSE 6006
CMD ["pnpm", "storybook", "--no-open"]
