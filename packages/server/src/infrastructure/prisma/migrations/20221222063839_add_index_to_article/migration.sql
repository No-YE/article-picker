-- custom migration
-- CreateExtension
CREATE EXTENSION pg_trgm;

-- CreateIndex
CREATE INDEX "Article_accountId_idx" ON "Article"("accountId");

-- CreateIndex
CREATE INDEX "Article_title_idx" ON "Article" USING GIN ("title" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "Article_description_idx" ON "Article" USING GIN ("description" gin_trgm_ops);
