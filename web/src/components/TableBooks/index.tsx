'use client';
import { api } from '@/lib/api';
import { editBooks } from '@/redux/reducers/reducer';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Book {
  id: number,
  name: string,
  launchDate: string,
  category: string,
  description: string,
  authors: [{ id: number, name: string; }];
}

interface bookToEdit {
  id: number,
  name: string,
  launchDate: string,
  category: string,
  description: string,
  authors: [{ id: number, name: string; }];
};


const TableBooks = () => {

  const dispatch = useDispatch();

  const [books, setBooks] = useState<Book[]>([])

  const [search, setSearch] = useState('')

  const getBooks = async() => {
    const booksApi = await api.get('/books');
    const { data } = booksApi;
    setBooks(data);
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  }

  const handleFilterBooks = () => {
    const filteredBooks = books.filter((book) => {
      return book.authors.some((author) => author.name.toLowerCase().includes(search.toLowerCase()));
    })
    setBooks(filteredBooks);
  }

  useEffect(() => {
    getBooks();
  }, [])

  const formatDate = (date: string)  => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear().toString();
    
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  }

  const deleteBook = async (id : number) => {
    await api.delete(`/books/${id}`);
    getBooks();
  }

  const editBook = (book : bookToEdit) => {
    dispatch(editBooks({ edit: true, book }))
  }

  return (
    <div>
      <label>
      Pesquisar livro por autor: {' '}
      <input type="text" onChange={ (e) => handleSearch(e) } value={ search } name='search' />
      <button onClick={ handleFilterBooks }>Filtrar</button>
      </label>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Lançamento</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          { books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{formatDate(book.launchDate)}</td>
              <td>{book.category}</td>
              <td>{book.description}</td>
              <td>
                <ul>
                  {book.authors.map((author) => (
                    <li key={author.id}>{author.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => editBook(book)}>Editar</button>
                <button onClick={() => deleteBook(book.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableBooks;
