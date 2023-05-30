'use client';

import Footer from '@/components/Footer'
import { api } from '@/lib/api'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './books.module.css';
import TableBooks from '@/components/TableBooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { resetBooks } from '@/redux/reducers/reducer';

interface TableProps {
  data: [];
}

interface Author {
  id: number;
  name: string;
}

function Books() {

  const book = useSelector((state: RootState) => state.book.book)
  const edit = useSelector((state: RootState) => state.book.edit)
  const dispatch = useDispatch();

  const [authors, setAuthors] = useState<Author[]>([])
  const [showBooks, setShowBooks] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number | null>(null);
  const [books, setBooks] = useState({
    name: '',
    category: '',
    description: '',
    launchDate: '',
    author: '',
  });

  const [authorList, setAuthorList] = useState<string[]>([])
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([])


  useEffect(() => {
    const getAuthors = async () => {
      const authorList = await api.get('/authors');      
      const { data } : TableProps = authorList;
      setAuthors(data);
      setFilteredAuthors(data);
    }
    getAuthors();
  }, [])

  useEffect(() => {
    if (edit) {
      const authorsEdit = book.authors.map((author) => author.name)
      setAuthorList(authorsEdit);
      const newAuthors = authors.filter((author) => !authorsEdit.includes(author.name))
      setFilteredAuthors(newAuthors); 
      setIdToEdit(book.id);     
      setBooks({
        name: book.name,
        category: book.category,
        description: book.description,
        launchDate: book.launchDate.slice(0, 10),
        author: filteredAuthors[0]?.name,
    })}
  }, [edit])

  const handleChange = (event: ChangeEvent<HTMLInputElement> 
    | ChangeEvent<HTMLTextAreaElement> 
    | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setBooks((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleAuthor = () => {
    if (filteredAuthors.length > 0) {
    setAuthorList([...authorList, books.author]);

    const newAuthors = authors.filter((author) => author.name !== books.author)

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

    await api.post('/books', { name, launchDate, category, description, authorIds })

    setBooks({
      name: '',
      category: '',
      description: '',
      launchDate: '',
      author: authors[0].name,
  });

  setFilteredAuthors(authors);
  setAuthorList([]);
}

  const toogleShowBooks = () => {
    if (showBooks) {
      setShowBooks(false);
      return;
    } 
    setShowBooks(true);
  }

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

    await api.put(`/books/${idToEdit}`, { name, launchDate, category, description, authorIds })

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
    dispatch(resetBooks())
  }

  return (
    <div className={ styles.mainBooks }>
      <label>Books</label>
      <form onSubmit={ edit ? handleEditBook : handleCreateBook } className={ styles.mainForm }>
        <label>
          Nome: {' '}
          <input 
            type='text' 
            name="name" 
            onChange={ handleChange } 
            value={ books.name } 
          />
        </label>
        <label>
          Data de lançamento: {' '}
          <input 
            type='date' 
            name="launchDate" 
            onChange={ handleChange } 
            value={ books.launchDate } 
          />
        </label>
        <label>
        Categoria: {' '}
          <input 
            type='text' 
            name="category" 
            onChange={ handleChange } 
            value={ books.category } 
          />
        </label>
        <label>
        Descrição: {' '}
          <textarea 
            minLength={1} 
            maxLength={500}
            name="description" 
            onChange={ handleChange }
            value={ books.description } 
          />
        </label>
        <label>
        Autores: {' '}
        </label>
          <select 
            onChange={ handleChange } 
            value={ books.author }
            name="author"
            >
            { filteredAuthors  && filteredAuthors?.map(({ id, name }) => (
              <option key={ id } value={ name }>
                { name }
              </option>
            ))}
          </select>
          <button 
        type='button'
        onClick={ handleAuthor }>
          Adicionar Autor
      </button>
          <table>
        <thead>
          <tr>
            <th>Autores selecionados</th>
          </tr>
        </thead>
        <tbody>
          {authorList?.map((author) => (
            <tr key={author}>
              <td>{author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { edit && <button>Editar</button>}
      { !edit && <button>Criar Book</button>}
      </form>
      <button onClick={ toogleShowBooks }>Exibit books</button>
      { showBooks && <TableBooks />  }
      <Footer />
    </div>
  )
}

export default Books