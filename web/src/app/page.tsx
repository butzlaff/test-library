import NextLink from 'next/link';
import './globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      className="flex grid-cols-2 content-center justify-center gap-10 py-10 text-4xl
    font-bold
    "
    >
      <Link
        href="/authors"
        className="rounded-xl bg-blue-400 p-4 shadow-2xl"
        data-testid="redirect-authors"
      >
        Autores
      </Link>
      <Link href="/books" className="rounded-xl bg-blue-400 p-4 shadow-2xl">
        Livros
      </Link>
    </main>
  );
}
