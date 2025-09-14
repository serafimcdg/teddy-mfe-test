import { render, screen } from '@testing-library/react';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import '@testing-library/jest-dom';

describe('LoaderSpinner', () => {
  it('rende o spinner quando true', () => {
    render(<LoaderSpinner visible={true} />);
    expect(screen.getByAltText('Carregando...')).toBeInTheDocument();
  });

  it('não renderiza false', () => {
    render(<LoaderSpinner visible={false} />);
    expect(screen.queryByAltText('Carregando...')).not.toBeInTheDocument();
  });
});
