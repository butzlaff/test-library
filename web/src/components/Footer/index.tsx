'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const pathName = usePathname();
  const [myNextLoc, setMyNextLoc] = useState<string | null>(null);

  useEffect(() => {
    if (pathName === '/authors') {
      setMyNextLoc('books');
    }
    if (pathName === '/books') {
      setMyNextLoc('authors');
    }
  }, [pathName]);

  return (
    <div className="m-4 flex content-center items-center justify-center">
      <div>
        <Link
          className="m-2 rounded-lg bg-blue-200 p-2 hover:bg-blue-300"
          href="/"
        >
          <button>Voltar a página principal</button>
        </Link>
      </div>
      <div>
        <Link
          className="m-2 rounded-lg bg-blue-200 p-2 hover:bg-blue-300"
          href={`/${myNextLoc}`}
        >
          <button>{`Ir para ${myNextLoc}`}</button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
