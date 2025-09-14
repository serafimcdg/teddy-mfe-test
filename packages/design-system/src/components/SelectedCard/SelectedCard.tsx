import * as React from 'react';
import { menosSvg } from '../../icons';
import { SelectedCardProps } from '../../types/selectedCard';

const SelectedCard: React.FC<SelectedCardProps> = ({ nome, salario, empresa, onDelete }) => {
  return (
    <section className="bg-white rounded-md p-4 flex flex-col w-full h-[138px] shadow-sm">
      <div className="flex flex-col items-center flex-1 justify-center">
        <h3 className="text-base font-semibold text-zinc-900">{nome}</h3>
        <p className="text-sm text-zinc-700 mt-2">Salário: {salario}</p>
        <p className="text-sm text-zinc-700 mt-2">Empresa: {empresa}</p>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="Remover"
          onClick={onDelete}
          className="h-8 w-8 p-0 bg-transparent border-0 cursor-pointer inline-flex items-center justify-center select-none"
        >
          <img src={menosSvg} alt="Remover" className="h-5 w-5 block pointer-events-none" />
        </button>
      </div>
    </section>
  );
};

export default SelectedCard;
