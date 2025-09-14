import * as React from 'react';

export type ModalClientProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { nome: string; salario: string; empresa: string }) => void;
};

export default function ModalClient({ open, onClose, onSubmit }: ModalClientProps) {
  const [nome, setNome] = React.useState('');
  const [salario, setSalario] = React.useState('');
  const [empresa, setEmpresa] = React.useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-[4px] shadow-lg border border-zinc-200 flex flex-col w-full max-w-md" style={{ minHeight: 269, position: 'relative', padding: '32px 24px 24px 24px' }}>
        <button
          className="absolute top-6 right-6 text-zinc-500 text-xl font-bold hover:text-zinc-700 bg-transparent w-8 h-8 flex items-center justify-center rounded"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-base font-semibold mb-6 text-left">Criar cliente:</h2>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={e => {
            e.preventDefault();
            onSubmit({ nome, salario, empresa });
          }}
        >
          <input
            className="border border-zinc-300 rounded-[4px] px-3 py-2 text-[14px] font-inter font-normal h-[40px] w-full bg-white text-zinc-900 focus:outline-none focus:border-orange-500 placeholder:text-zinc-400"
            placeholder="Digite o nome:"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <input
            className="border border-zinc-300 rounded-[4px] px-3 py-2 text-[14px] font-inter font-normal h-[40px] w-full bg-white text-zinc-900 focus:outline-none focus:border-orange-500 placeholder:text-zinc-400"
            placeholder="Digite o salário:"
            value={salario}
            onChange={e => setSalario(e.target.value)}
            required
          />
          <input
            className="border border-zinc-300 rounded-[4px] px-3 py-2 text-[14px] font-inter font-normal h-[40px] w-full bg-white text-zinc-900 focus:outline-none focus:border-orange-500 placeholder:text-zinc-400"
            placeholder="Digite o valor da empresa:"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full h-[40px] border-none rounded-[4px] bg-[#EC6724] text-white font-inter font-bold text-[14px] leading-[40px] transition hover:bg-orange-600 flex items-center justify-center"
          >
            Criar cliente
          </button>
        </form>
      </div>
    </div>
  );
}
