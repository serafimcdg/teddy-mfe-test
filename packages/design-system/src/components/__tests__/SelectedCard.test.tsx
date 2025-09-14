import { render, screen, fireEvent } from '@testing-library/react';
import SelectedCard from '../SelectedCard/SelectedCard';
import '@testing-library/jest-dom';

describe('SelectedCard', () => {
  it('renderiza nome,salario, empresa', () => {
    render(<SelectedCard nome="joão" salario="5000" empresa="Teddy" onDelete={() => {}} />);
    expect(screen.getByText('joão')).toBeInTheDocument();
    expect(screen.getByText('Salário: 5000')).toBeInTheDocument();
    expect(screen.getByText('Empresa: Teddy')).toBeInTheDocument();
  });

  it('chama onDelete ao clicar', () => {
    const onDelete = jest.fn();
    render(<SelectedCard nome="Maria" salario="6000" empresa="Acme" onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText('Remover'));
    expect(onDelete).toHaveBeenCalled();
  });
});
