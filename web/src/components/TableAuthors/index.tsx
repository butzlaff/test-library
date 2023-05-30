import React from 'react';

interface Author {
  id: number,
  name: string,
  birth: Date,
  bio: string,
  dataBooks: [{ id: number, name: string; }];
}

interface TableProps {
  authors: Author[];
}
const TableAuthors: React.FC<TableProps> = ({ authors }) => {
  return (
    <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>Bio</th>
            <th>Livros</th>
          </tr>
        </thead>
        <tbody>
          {authors?.map((author) => (
            <tr key={ author.id }>
              <td>{ author.name }</td>
              <td>{ new Date(author.birth).toLocaleDateString() }</td>
              <td>{ author.bio }</td>
              <td>
                { author.dataBooks.length > 0 ? (
                  <ul>
                    { author.dataBooks.map((book) => (
                      <li key={ book.id }>{ book.name }</li>
                    ))}
                  </ul>
                ) : (
                  "Nenhum livro"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default TableAuthors;
