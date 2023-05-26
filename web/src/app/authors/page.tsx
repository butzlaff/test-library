"use client";
import { api } from "@/lib/api";
import { FormEvent, useState } from "react";
import styles from './authors.module.css'
import Table from "@/components/Table";
import Footer from "@/components/Footer";

interface TargetChange {
  name: string;
  value: string;
}

function Authors() {
  const [controlInput, setControlInput] = useState({
    name: '',
    birth: '',
    bio: '',
  })

  const [authorsList, setAuthorsList] = useState<[] | null>(null);
  
  const handleChange = ({ target }: { target: TargetChange }) => {
    const { name, value } = target;
    setControlInput({
      ...controlInput,
      [name]: value,
    });
  };


  const handleCreateAuthor = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name');
    // const birth = formData.get('birth')
    const bio = formData.get('bio');
    
     const birth = new Date(controlInput.birth).toISOString();
    
    await api.post('/authors', { name, birth, bio });
  }

  const handleViewAuthors = async () => {
    const authors = await api.get('/authors')
    setAuthorsList(authors.data);
  }

  return (
    <main className={ styles.mainAuthors }>
      <div>
      Criar autores
      <form onSubmit={ handleCreateAuthor }>
        <label>Nome:{' '}
        <input type='text' name="name" onChange={ handleChange } value={ controlInput.name } />
        </label>
        <label>Birth date:{' '}
        <input type='date' name="birth" onChange={ handleChange } />
        </label>
        <label>Bio{' '}
        <input type='text' name="bio" onChange={ handleChange } value={ controlInput.bio } />
        </label>
        <button type='submit'>Criar Autor</button>
      </form>
      </div>
      <div>
        <button onClick={ handleViewAuthors }>Exibir autores cadastrados</button>
        { authorsList && <Table authors={ authorsList } /> }
      </div>
      <Footer />
    </main>
  )
}

export default Authors