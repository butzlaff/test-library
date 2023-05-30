'use client';
import { api } from '@/lib/api';
import { editBooks } from '@/redux/reducers/reducer';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Book {
  id: number;
  name: string;
  launchDate: string;
  category: string;
  description: string;
  authors: [{ id: number; name: string }];
}

interface bookToEdit {
  id: number;
  name: string;
  launchDate: string;
  category: string;
  description: string;
  authors: [{ id: number; name: string }];
}

const TableBooks = () => {
  const dispatch = useDispatch();

  const [books, setBooks] = useState<Book[]>([]);

  const [search, setSearch] = useState('');

  const getBooks = async () => {
    const booksApi = await api.get('/books');
    const { data } = booksApi;
    setBooks(data);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleFilterBooks = () => {
    const filteredBooks = books.filter((book) => {
      return book.authors.some((author) =>
        author.name.toLowerCase().includes(search.toLowerCase()),
      );
    });
    setBooks(filteredBooks);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const deleteBook = async (id: number) => {
    await api.delete(`/books/${id}`);
    getBooks();
  };

  const editBook = (book: bookToEdit) => {
    dispatch(editBooks({ edit: true, book }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-1/3 flex-col items-center justify-center bg-green-200 p-5">
        <label className="font-medium">
          Pesquisar livro por autor:{' '}
          <input
            placeholder="Digite o nome do autor"
            className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
            type="text"
            onChange={(e) => handleSearch(e)}
            value={search}
            name="search"
          />
          <button
            className="rounded-lg bg-blue-200 p-2 hover:bg-blue-300"
            onClick={handleFilterBooks}
          >
            Filtrar
          </button>
        </label>
      </div>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Nome
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Lançamento
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Categoria
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Descrição
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Autores
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border-b px-10 py-4 text-center">{book.name}</td>
              <td className="border-b px-10 py-4 text-center">
                {formatDate(book.launchDate)}
              </td>
              <td className="border-b px-10 py-4 text-center">
                {book.category}
              </td>
              <td className="border-b px-10 py-4 text-center">
                {book.description}
              </td>
              <td className="border-b px-10 py-4 text-center">
                <ul>
                  {book.authors.map((author) => (
                    <li key={author.id}>{author.name}</li>
                  ))}
                </ul>
              </td>
              <td className="border-b px-10 py-4 text-center">
                <button
                  className="rounded-lg bg-green-200 p-2 hover:bg-blue-300"
                  onClick={() => editBook(book)}
                >
                  Editar
                </button>

                <button
                  className="rounded-lg bg-red-400 p-2 hover:bg-blue-300"
                  onClick={() => deleteBook(book.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBooks;
