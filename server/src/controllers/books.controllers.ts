import { prisma } from '../lib/prisma';

export async function getAllBooks(req: Request, res: Response) {
  try {
    const books = await prisma.dataBook.findMany({
      include: { authors: true },
    });
    return books;
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: 'Something went wrong'})
  }
}
