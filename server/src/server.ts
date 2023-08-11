import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authorsRoutes } from './routes/authorsRoutes';
import { booksRoutes } from './routes/booksRoutes';
import cors from '@fastify/cors';

const app: FastifyInstance = fastify({});
const port: number = Number(process.env.PORT);
const host: string = process.env.HOST!;

app.register(cors, {
  origin: [`http://${host}:3000`],
});

app.register(authorsRoutes);
app.register(booksRoutes);

app.setErrorHandler((error, _req: FastifyRequest, res: FastifyReply) => {
  console.log(error);
  res.status(500).send({ error: 'Something went wrong' });
});

app.listen({ port, host }).then(() => {
  console.log(`📚 HTTP server running on HTTP://${host}:${port}`);
});
