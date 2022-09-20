import { PrismaClient } from 'my-prisma';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
