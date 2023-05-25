import fastify from "fastify";
import { PrismaClient } from '@prisma/client'

const app = fastify();

const appData = {
  port: 3333,
  host: '0.0.0.0',
}

const prisma = new PrismaClient();

app.get('/authors', async() => {
  const author = await prisma.authors.findMany();

  return author;
})


app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on HTTP://localhost:3333')
})