import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';

interface Author {
  id: number;
  name: string;
}

export async function getAllBooks(req: FastifyRequest, res: FastifyReply) {
  const books = await prisma.dataBook.findMany({
    include: {
      authors: true,
    },
  });
  return books;
}

export async function getBookById(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id: string };
  const newId = Number(id);
  const books = await prisma.dataBook.findUnique({
    where: {
      id: newId,
    },
    include: {
      authors: true,
    },
  });
  return books;
}

export async function createBook(req: FastifyRequest, res: FastifyReply) {
  const { name, category, launchDate, description, authorIds } = req.body as {
    name: string;
    category: string;
    launchDate: string;
    description: string;
    authorIds: Author[];
  };
  const books = await prisma.dataBook.create({
    data: {
      name,
      category,
      launchDate,
      description,
      authors: {
        connect:
          authorIds.length > 0 ? authorIds?.map(({ id }) => ({ id })) : [],
      },
    },
    include: {
      authors: true,
    },
  });

  return books;
}

export async function deleteBook(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id: string };
  const newId = Number(id);
  const books = await prisma.dataBook.delete({
    where: {
      id: newId,
    },
  });
  return books;
}

export async function updateBook(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id: string };
  const { name, category, launchDate, description, authorIds } = req.body as {
    name: string;
    category: string;
    launchDate: string;
    description: string;
    authorIds: Author[];
  };
  const books = await prisma.dataBook.update({
    data: {
      name,
      category,
      description,
      launchDate,
      authors: {
        connect:
          authorIds.length > 0 ? authorIds?.map(({ id }) => ({ id })) : [],
      },
    },
    include: {
      authors: true,
    },
    where: {
      id: parseInt(id),
    },
  });
  return books;
}

export const booksController = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
};
