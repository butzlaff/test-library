import Authors from '@/app/authors/page';
import Home from '@/app/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    const authors = screen.getByRole('link', {  name: /autores/i})
    expect(authors).toBeInTheDocument();
    userEvent.click(authors);
});
  it('renders Authors', async () => {
    render(<Authors />, '/authors');
    const authors = screen.getByRole('heading', {  name: /autores/i})
    expect(authors).toBeInTheDocument();
  });
  })  
