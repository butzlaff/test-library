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
    <div>
      <div>
        <Link href="/">
          <button>Voltar a página principal</button>
        </Link>
      </div>
      <div>
        <Link href={`/${myNextLoc}`}>
          <button>{`Ir para ${myNextLoc}`}</button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
