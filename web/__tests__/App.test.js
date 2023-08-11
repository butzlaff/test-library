import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../src/app/page'
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';


describe('Home', () => {
  it('Should renders Home', () => {
    render(<Home />
    );

    screen.debug()
    const authors = screen.getByTestId('redirect-authors');
    expect(authors).toBeInTheDocument();
    authors.click();
});
  it('Should redirect user to /authors when clicked on "Autores" button', async () => {
    const history = render(<Home />, MemoryRouterProvider);
    console.log(history);

    const authors = screen.getByTestId('redirect-authors');
    fireEvent.click(authors);
    screen.debug()
    await waitFor(() => {
      expect(mockRouter.asPath).toBeCalledWith("/authors");
    })
  }) 
})
