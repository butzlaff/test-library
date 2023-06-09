import { Providers } from '@/redux/reducers/provider';
import './globals.css';
export const metadata = {
  title: 'Gestor de Livraria',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
