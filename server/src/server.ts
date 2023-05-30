import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { authorsRoutes } from './routes/authorsRoutes';
import { booksRoutes } from './routes/booksRoutes';
import cors from '@fastify/cors';

const app = fastify();

app.register(cors, {
  origin: ['http://localhost:3000'],
});

app.register(authorsRoutes);
app.register(booksRoutes);

app.setErrorHandler((error, req: FastifyRequest, res: FastifyReply) => {
  console.log(error);
  res.status(500).send({ error: 'Something went wrong' });
});

app
  .listen({    port: 3333,    host: '0.0.0.0'  })
  .then(() => {
    console.log('📚 HTTP server running on HTTP://localhost:3333');
  })

;
