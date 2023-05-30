import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { getAllBooks } from "../controllers/books.controllers";

export async function authorsRoutes(app:FastifyInstance) {
  app.get('/authors', async(req, res) => getAllBooks(req, res));

  app.get('/authors/list', async() => {
    try {
      const author = await prisma.authors.findMany({
        select: {
          id: true,
          name: true,
        }
      });
      return author
    } catch (error) {
        console.error(error.message);
      }
  });

  app.post('/authors', async (req) => {
    try {
    const { name, birth, bio } = req.body as { name: string, birth: Date, bio: string }
    const author = await prisma.authors.create({
      data: {
        name,
        birth,
        bio,
      },
    });

    return author;
  }
  catch (error) {
    console.error(error.message);
  }
});
}
