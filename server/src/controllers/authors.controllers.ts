import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { authorsService } from '../services/authors.services';

const getAllAuthors = async (_req: FastifyRequest, res: FastifyReply) => {
  const authors = await authorsService.findManyAuthors();
  return res.status(authors.status).send(authors.data);
};

interface Author {
  name: string;
  birth: string;
  bio: string;
}

const getAllAuthorsIdAndName = async (
  _req: FastifyRequest,
  res: FastifyReply,
) => {
  const author = await authorsService.getAuthorsIdAndName();
  return res.status(author.status).send(author.data);
};

const createAuthor = async (req: FastifyRequest, res: FastifyReply) => {
  const { name, birth, bio } = req.body as Author;
  const author = await prisma.authors.create({
    data: {
      name,
      birth,
      bio,
    },
  });
  return author;
};

export const authorsController = {
  getAllAuthors,
  getAllAuthorsIdAndName,
  createAuthor,
};
