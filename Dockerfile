FROM node:18 AS builder
WORKDIR /app

COPY manifests ./
COPY packs ./
RUN yarn install --immutable
RUN yarn workspace server build

FROM node:18
WORKDIR /app

ENV NODE_ENV production
ENV DATABASE_URL $DATABASE_URL
ENV GOOGLE_ID $GOOGLE_ID
ENV GOOGLE_SECRET $GOOGLE_SECRET

COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/packages/server/package.json ./packages/server/package.json
COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/prisma ./packages/prisma

EXPOSE 3000
CMD yarn workspace server start
