"use client";
import { api } from "@/lib/api";
import { FormEvent, useState } from "react";

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
  
  const handleChange = ({ target }: { target: TargetChange }) => {
    const { name, value } = target;
    setControlInput({
      ...controlInput,
      [name]: value,
    });
  };


  const handleCreateAuthor = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    

    
    const name = formData.get('name')
    // const birth = formData.get('birth')
    const bio = formData.get('bio')
    
    const birth = new Date(controlInput.birth).toISOString();

    console.log(typeof birth);
    
    await api.post('/authors', { name, birth, bio });
  }

  return (
    <main>
      <div>Authors</div>
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
    </main>
  )
}

export default Authors