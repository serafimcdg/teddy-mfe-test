import * as React from 'react';
import { ModalClientProps } from '../../types/modalClient';

export default function ModalClient({ open, onClose, onSubmit, initialData, title = "Criar cliente:", buttonText = "Criar cliente" }: ModalClientProps) {
  const [nome, setNome] = React.useState(initialData?.nome ?? '');
  const [salario, setSalario] = React.useState(initialData?.salario ?? '');
  const [empresa, setEmpresa] = React.useState(initialData?.empresa ?? '');

  React.useEffect(() => {
    setNome(initialData?.nome ?? '');
    setSalario(initialData?.salario ?? '');
    setEmpresa(initialData?.empresa ?? '');
    console.log(initialData,"aaaaaaaaaaaaaaa");
    
  }, [initialData, open]);

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
        <h2 className="text-base font-semibold mb-6 text-left">{title}</h2>
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
          <div className="relative w-full">
            {(initialData || salario) && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">R$</span>
            )}
            <input
              className={`border border-zinc-300 rounded-[4px] ${(initialData || salario) ? 'pl-10' : 'px-3'} pr-3 py-2 text-[14px] font-inter font-normal h-[40px] w-full bg-white text-zinc-900 focus:outline-none focus:border-orange-500 placeholder:text-zinc-400`}
              placeholder="Digite o salário:"
              value={salario}
              onChange={e => {
                const onlyNumbers = e.target.value.replace(/\D/g, '');
                const asNumber = onlyNumbers ? parseInt(onlyNumbers, 10) : 0;
                const formatted = asNumber ? (asNumber / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/^R\$\s?/, '') : '';
                setSalario(formatted);
              }}
              required
            />
          </div>
          <div className="relative w-full">
            {(initialData || empresa) && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">R$</span>
            )}
            <input
              className={`border border-zinc-300 rounded-[4px] ${(initialData || empresa) ? 'pl-10' : 'px-3'} pr-3 py-2 text-[14px] font-inter font-normal h-[40px] w-full bg-white text-zinc-900 focus:outline-none focus:border-orange-500 placeholder:text-zinc-400`}
              placeholder="Digite o valor da empresa:"
              value={empresa}
              onChange={e => {
                const onlyNumbers = e.target.value.replace(/\D/g, '');
                const asNumber = onlyNumbers ? parseInt(onlyNumbers, 10) : 0;
                const formatted = asNumber ? (asNumber / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/^R\$\s?/, '') : '';
                setEmpresa(formatted);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-[40px] border-none rounded-[4px] bg-[#EC6724] text-white font-inter font-bold text-[14px] leading-[40px] transition hover:bg-orange-600 flex items-center justify-center"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
