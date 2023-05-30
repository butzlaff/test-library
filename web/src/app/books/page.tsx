'use client';

import Footer from '@/components/Footer';
import { api } from '@/lib/api';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './books.module.css';
import TableBooks from '@/components/TableBooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { resetBooks } from '@/redux/reducers/reducer';
import { Author, TableProps } from '@/interface/interface';

function Books() {
  const book = useSelector((state: RootState) => state.book.book);
  const edit = useSelector((state: RootState) => state.book.edit);
  const dispatch = useDispatch();

  const [authors, setAuthors] = useState<Author[]>([]);
  const [showBooks, setShowBooks] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number | null>(null);
  const [books, setBooks] = useState({
    name: '',
    category: '',
    description: '',
    launchDate: '',
    author: '',
  });

  const [authorList, setAuthorList] = useState<string[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const getAuthors = async () => {
      const authorList = await api.get('/authors');
      const { data }: TableProps = authorList;
      setAuthors(data);
      setFilteredAuthors(data);
    };
    getAuthors();
  }, []);

  useEffect(() => {
    if (edit) {
      const authorsEdit = book.authors.map((author) => author.name);
      setAuthorList(authorsEdit);
      const newAuthors = authors.filter(
        (author) => !authorsEdit.includes(author.name),
      );
      setFilteredAuthors(newAuthors);
      setIdToEdit(book.id);
      setBooks({
        name: book.name,
        category: book.category,
        description: book.description,
        launchDate: book.launchDate.slice(0, 10),
        author: filteredAuthors[0]?.name,
      });
    }
  }, [authors]);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setBooks((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleAuthor = () => {
    if (filteredAuthors.length > 0) {
      setAuthorList([...authorList, books.author]);

      const newAuthors = authors.filter(
        (author) => author.name !== books.author,
      );

      setFilteredAuthors(newAuthors);
    }
  };

  const handleCreateBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const authorIds = authorList?.map((authorName) => {
      return authors.find(({ name }) => name === authorName);
    });

    const name = formData.get('name');
    const category = formData.get('category');
    const description = formData.get('description');
    const launchDate = new Date(books.launchDate).toISOString();

    await api.post('/books', {
      name,
      launchDate,
      category,
      description,
      authorIds,
    });

    setBooks({
      name: '',
      category: '',
      description: '',
      launchDate: '',
      author: authors[0].name,
    });

    setFilteredAuthors(authors);
    setAuthorList([]);
  };

  const toogleShowBooks = () => {
    if (showBooks) {
      setShowBooks(false);
      return;
    }
    setShowBooks(true);
  };

  const handleEditBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const authorIds = authorList?.map((authorName) => {
      return authors.find(({ name }) => name === authorName);
    });

    const name = formData.get('name');
    const category = formData.get('category');
    const description = formData.get('description');
    const launchDate = new Date(books.launchDate).toISOString();

    await api.put(`/books/${idToEdit}`, {
      name,
      launchDate,
      category,
      description,
      authorIds,
    });

    setBooks({
      name: '',
      category: '',
      description: '',
      launchDate: '',
      author: authors[0].name,
    });
    setIdToEdit(null);
    setFilteredAuthors(authors);
    setAuthorList([]);
    dispatch(resetBooks());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="w-screen bg-gray-300 p-5 text-center text-5xl font-bold">
        Books
      </h1>
      <div className="flex w-1/3 flex-col items-center justify-center bg-green-200 p-5">
        <form
          className="flex w-full flex-col items-center justify-center gap-3"
          onSubmit={edit ? handleEditBook : handleCreateBook}
        >
          <label className="font-medium">
            Nome:{' '}
            <input
              placeholder="Nome do livro"
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              type="text"
              name="name"
              onChange={handleChange}
              value={books.name}
            />
          </label>
          <label className="font-medium">
            Data de lançamento:{' '}
            <input
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              type="date"
              name="launchDate"
              onChange={handleChange}
              value={books.launchDate}
            />
          </label>
          <label className="font-medium">
            Categoria:{' '}
            <input
              placeholder="Categoria do livro"
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              type="text"
              name="category"
              onChange={handleChange}
              value={books.category}
            />
          </label>
          <label className="flex items-center gap-2 font-medium">
            Descrição:{' '}
            <textarea
              placeholder="Descrição do livro"
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              name="description"
              onChange={handleChange}
              value={books.description}
              maxLength={100}
              cols={30}
            />
          </label>
          <label className="font-medium">Autores: </label>
          <select onChange={handleChange} value={books.author} name="author">
            {filteredAuthors &&
              filteredAuthors?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
          </select>
          <button
            type="button"
            className="rounded-lg bg-blue-200 p-2 hover:bg-blue-300"
            onClick={handleAuthor}
          >
            Adicionar Autor
          </button>
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr>
                <th className="bg-green-200 px-4 py-2 text-center font-semibold">
                  Autores selecionados
                </th>
              </tr>
            </thead>
            <tbody>
              {authorList?.map((author) => (
                <tr key={author}>
                  <td className="border-b px-10 py-4 text-center">{author}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {edit && <button>Editar</button>}
          {!edit && (
            <button className="rounded-lg bg-blue-200 p-2 hover:bg-blue-300">
              Criar Book
            </button>
          )}
        </form>
        <button
          className="mt-4 rounded-lg bg-blue-200 p-2 hover:bg-blue-300"
          onClick={toogleShowBooks}
        >
          Exibit books
        </button>
      </div>
      {showBooks && <TableBooks />}
      <Footer />
    </div>
  );
}

export default Books;
