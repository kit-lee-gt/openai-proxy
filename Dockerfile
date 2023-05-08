FROM node:19-alpine

EXPOSE 3000

COPY . /app
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build
RUN echo "Y" | pnpm prune --prod

ENTRYPOINT ["pnpm", "start"]
