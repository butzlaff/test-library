import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className="main">
      <Link href="/authors">Autores</Link>
      <Link href="/books">Livros</Link>
    </main>
  )
}
