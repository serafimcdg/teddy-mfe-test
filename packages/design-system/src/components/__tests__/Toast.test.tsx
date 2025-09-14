import { render, screen, fireEvent } from '@testing-library/react';
import Toast from '../Toast';
import '@testing-library/jest-dom';

describe('Toast', () => {
  it('renderiza mensagem de sucesso', () => {
    render(<Toast type="success" message="ok" visible={true} />);
    expect(screen.getByText('ok')).toBeInTheDocument();
    expect(screen.getByAltText('success')).toBeInTheDocument();
  });

  it('renderiza mensagem de erro', () => {
    render(<Toast type="error" message="Deu ruim!" visible={true} />);
    expect(screen.getByText('Deu ruim!')).toBeInTheDocument();
    expect(screen.getByAltText('error')).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão', () => {
    const onClose = jest.fn();
    render(<Toast type="success" message="Fechar" visible={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Fechar'));
    expect(onClose).toHaveBeenCalled();
  });

  it('não renderiza quando visiblefalse', () => {
    render(<Toast type="success" message="Nada" visible={false} />);
    expect(screen.queryByText('Nada')).not.toBeInTheDocument();
  });
});
