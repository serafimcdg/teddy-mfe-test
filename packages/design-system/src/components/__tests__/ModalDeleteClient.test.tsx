import { render, screen, fireEvent } from '@testing-library/react';
import ModalDeleteClient from '../ModalClient/ModalDeleteClient';
import '@testing-library/jest-dom';

describe('ModalDeleteClient', () => {
  it('renderiza o nome cliente, botão excluir', () => {
    render(<ModalDeleteClient open={true} clientName="joão" onClose={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Excluir cliente:')).toBeInTheDocument();
  expect(screen.getByText('Você está prestes a excluir o cliente:')).toBeInTheDocument();
  expect(screen.getByText('joão')).toBeInTheDocument();
  expect(screen.getByText('Excluir cliente')).toBeInTheDocument();
  });

  it('chama onClose e onDelete', () => {
    const onClose = jest.fn();
    const onDelete = jest.fn();
    render(<ModalDeleteClient open={true} clientName="maria" onClose={onClose} onDelete={onDelete} />);
  fireEvent.click(screen.getByLabelText('Fechar'));
  fireEvent.click(screen.getByText('Excluir cliente'));
    expect(onClose).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

  it('não renderiza quando false', () => {
    render(<ModalDeleteClient open={false} clientName="Maria" onClose={() => {}} onDelete={() => {}} />);
    expect(screen.queryByText('Excluir cliente:')).not.toBeInTheDocument();
  });
});
