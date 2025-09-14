import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonCreate from '../ButtonCreate/ButtonCreate';

describe('Button', () => {
  it('renderiza o texto corretamente', () => {
  render(<ButtonCreate>Testar</ButtonCreate>);
    expect(screen.getByText('Testar')).toBeInTheDocument();
  });

  it('chama onClick quando clicado', () => {
    const handleClick = jest.fn();
  render(<ButtonCreate onClick={handleClick}>Clique</ButtonCreate>);
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalled();
  });
});
