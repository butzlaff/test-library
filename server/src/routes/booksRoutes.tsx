import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

interface Author {
  id: number;
  name: string;
}

export async function booksRoutes(app:FastifyInstance) {
  app.get('/books', async() => {
    try {
      const books = await prisma.dataBook.findMany({
      include: {
        authors: true,
      }      
      });
      return books;
    } catch (e) {
      console.log(e);
    }
  })

  app.get('/books/:id', async(req) => {
    const { id } = req.params as { id: string };    
    const books = await prisma.dataBook.findUnique({
      include: {
        authors: true,
      },
      where: {
        id: parseInt(id),
      }
    })
  
    return books;
  })

  app.post('/books', async(req) => {
    const { name, category, launchDate, description, authorIds } = req.body as { name: string, 
      category: string, launchDate: string, description: string, authorIds: Author[]};    
    console.log(req.body);
    const books = await prisma.dataBook.create({
      data: {
        name,
        category,
        launchDate,
        description,
        authors: {
          connect: authorIds.length > 0 ? authorIds?.map(({ id }) => ({ id })) : [],
        },
      },
      include: {
        authors: true,
      },
    });

    return books;

});

  app.delete('/books/:id', async(req) => {
    try {
    const { id } = req.params as { id: string };  
    const newId = Number(id)
    const books = await prisma.dataBook.delete({
      where: {
        id: newId,
      }
    });
  
    return books;
    } catch (e) {
      console.log(e);
      
    }

  })
  app.put('/books/:id', async(req) => {
    try {
    const { id } = req.params as { id: string };   
    const { name, category, launchDate, description, authorIds } = req.body as { name: string, 
      category: string, launchDate: string, description: string, authorIds: Author[]};  
    const books = await prisma.dataBook.update({
      data: {
        name,
        category,
        description,
        launchDate,
        authors: {
          connect: authorIds.length > 0 ? authorIds?.map(({ id }) => ({ id })) : [],
        },
      },
      include: {
        authors: true,
      },
      where: {
        id: parseInt(id),
      }
    });
    return books;
    } catch (e) {
      console.log(e);
    }
  })
  }