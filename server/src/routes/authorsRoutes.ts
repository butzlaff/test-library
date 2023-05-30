import { FastifyInstance } from 'fastify';
import { authorsController } from '../controllers/authors.controllers';

export async function authorsRoutes(app: FastifyInstance) {
  app.get('/authors', authorsController.getAllAuthors);

  app.get('/authors/list', authorsController.getAllAuthorsIdAndName);

  app.post('/authors', authorsController.createAuthor);
}
