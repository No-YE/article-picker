FROM node:18 AS builder
WORKDIR /app

COPY manifests ./
COPY packs ./
RUN yarn install --immutable && yarn workspace server prisma:generate && yarn workspace server build

FROM node:18
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.yarnrc.yml /app/yarn.lock /app/package.json ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/server/package.json ./packages/server/package.json
COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/prisma ./packages/prisma

EXPOSE 3000
CMD yarn workspace server start
