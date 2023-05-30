import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { booksController } from '../controllers/books.controllers';

export async function booksRoutes(app: FastifyInstance) {
  app.get('/books', booksController.getAllBooks);

  app.get('/books/:id', booksController.getBookById);

  app.post('/books', booksController.createBook);

  app.delete('/books/:id', booksController.deleteBook);

  app.put('/books/:id', booksController.updateBook);
}
