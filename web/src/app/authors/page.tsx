'use client';
import { api } from '@/lib/api';
import { FormEvent, useState } from 'react';
import Footer from '@/components/Footer';
import TableAuthors from '@/components/TableAuthors';
import { TargetChange } from '@/interface/interface';

function Authors() {
  const [controlInput, setControlInput] = useState({
    name: '',
    birth: '',
    bio: '',
  });

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

    setControlInput({
      name: '',
      birth: '',
      bio: '',
    });
  };

  const handleViewAuthors = async () => {
    const authors = await api.get('/authors');
    setAuthorsList(authors.data);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="w-screen bg-gray-300 p-5 text-center text-5xl font-bold">
        Autores
      </h1>
      <div className="flex w-full flex-col items-center justify-center bg-green-200 p-5">
        <form
          onSubmit={handleCreateAuthor}
          className="flex w-full flex-col items-center justify-center gap-3"
        >
          <label className="font-medium">
            Nome:{' '}
            <input
              placeholder="Digite o nome do autor"
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              type="text"
              name="name"
              onChange={handleChange}
              value={controlInput.name}
            />
          </label>
          <label className="font-medium">
            Nascimento:{' '}
            <input
              placeholder="Digite a data de nascimento"
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              type="date"
              name="birth"
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center gap-2 font-medium">
            Bio{' '}
            <textarea
              placeholder="Digite a biografia do autor"
              className="rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-50"
              name="bio"
              onChange={handleChange}
              value={controlInput.bio}
              maxLength={500}
              cols={30}
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-blue-200 p-2 hover:bg-blue-300"
          >
            CADASTRAR AUTOR
          </button>
        </form>
        <button
          className="m-4 rounded-lg bg-blue-200 p-4 hover:bg-blue-300"
          onClick={handleViewAuthors}
        >
          VER AUTORES
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {authorsList && <TableAuthors authors={authorsList} />}
      </div>
      {/* <Footer /> */}
    </main>
  );
}

export default Authors;
