import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card/Card';

describe('Card', () => {
  it('renderiza os campos', () => {
    render(<Card title="titulo" subtitle="sub" description="desc" />);
    expect(screen.getByText('titulo')).toBeInTheDocument();
    expect(screen.getByText('sub')).toBeInTheDocument();
  expect(screen.getByText('desc')).toBeInTheDocument();
  });

  it('chama botao edicao, excluir e selecionar', () => {
    const onSelect = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(
      <Card title="titulo" onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByTestId('card-action-select'));
    fireEvent.click(screen.getByTestId('card-action-edit'));
    fireEvent.click(screen.getByTestId('card-action-delete'));
    expect(onSelect).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
