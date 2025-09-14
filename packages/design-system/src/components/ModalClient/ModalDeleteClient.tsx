import { ModalDeleteClientProps } from '../../types/modalDeleteClient';

export default function ModalDeleteClient({ open, onClose, onDelete, clientName }: ModalDeleteClientProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-white rounded-[4px] shadow-lg border border-zinc-200 flex flex-col items-center"
        style={{ width: 400, minHeight: 148, padding: '24px 24px 16px 24px', position: 'relative', top: 'unset', left: 'unset', margin: '0 auto' }}
      >
        <button
          className="absolute top-4 right-4 text-zinc-500 text-xl font-bold hover:text-zinc-700 bg-transparent w-8 h-8 flex items-center justify-center rounded"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="w-full flex flex-col items-center">
          <h2 className="text-base font-semibold mb-2 w-full text-left">Excluir cliente:</h2>
          <div className="mb-6 w-full text-zinc-700 text-left">
            Você está prestes a excluir o cliente: <b>{clientName}</b>
          </div>
          <button
            className="w-full h-[40px] border-none rounded-[4px] bg-[#EC6724] text-white font-inter font-bold text-[14px] leading-[40px] transition hover:bg-orange-600 flex items-center justify-center"
            onClick={onDelete}
          >
            Excluir cliente
          </button>
        </div>
      </div>
    </div>
  );
}