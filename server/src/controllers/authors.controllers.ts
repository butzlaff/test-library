import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';

const getAllAuthors = async (_req: FastifyRequest, res: FastifyReply) => {
  const author = await prisma.authors.findMany({
    include: { dataBooks: true },
  });

  return author;
};

const getAllAuthorsIdAndName = async (
  _req: FastifyRequest,
  res: FastifyReply,
) => {
  const author = await prisma.authors.findMany({
    select: { id: true, name: true },
  });
  return author;
};

const createAuthor = async (req: FastifyRequest, res: FastifyReply) => {
  const { name, birth, bio } = req.body as {
    name: string;
    birth: Date;
    bio: string;
  };
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
