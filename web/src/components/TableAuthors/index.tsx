import { TableAuthorProps } from '@/interface/interface';
import React from 'react';

const TableAuthors: React.FC<TableAuthorProps> = ({ authors }) => {
  return (
    <div className="mt-2 flex flex-col items-center rounded-t-lg border-2 bg-green-200 pt-2">
      <h1 className="mb-2 text-lg font-medium">Lista de autores</h1>
      <table className="border-1 min-w-full border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Nome
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Nascimento
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Bio
            </th>
            <th className="bg-green-200 px-4 py-2 text-center font-semibold">
              Livros
            </th>
          </tr>
        </thead>
        <tbody>
          {authors?.map((author) => (
            <tr key={author.id}>
              <td className="border-b px-10 py-4 text-center">{author.name}</td>
              <td className="border-b px-10 py-4 text-center">
                {new Date(author.birth).toLocaleDateString()}
              </td>
              <td className="border-b px-10 py-4 text-center">{author.bio}</td>
              <td className="border-b px-10 py-4 text-center">
                {author.dataBooks.length > 0 ? (
                  <ul>
                    {author.dataBooks.map((book) => (
                      <li key={book.id}>{book.name}</li>
                    ))}
                  </ul>
                ) : (
                  'Nenhum livro'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAuthors;
