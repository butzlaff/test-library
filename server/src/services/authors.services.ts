import { prisma } from "../lib/prisma";

const findManyAuthors = async () => {
  const authors = await prisma.authors.findMany({
    include: { dataBooks: true },
  });
  if (authors) {
    return { status: 200, data: authors };
  }
  return { status: 404, data: "Authors not found" };
};

const getAuthorsIdAndName = async () => {
  const authors = await prisma.authors.findMany({
    select: { id: true, name: true },
  });
  if (authors) {
    return { status: 200, data: authors };
  }
  return { status: 404, data: "Authors not found" };
};

export const authorsService = { findManyAuthors, getAuthorsIdAndName }