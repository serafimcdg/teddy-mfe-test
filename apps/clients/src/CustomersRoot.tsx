import React, { useState, useEffect } from 'react';

type CustomersRootProps = {
  readonly onSelectClient?: (id: number, client: Client) => void;
  readonly selectedCardIds?: number[];
};
import { Card, ButtonCreate, ModalDeleteClient, ModalClient, Toast, LoaderSpinner } from '@teddy/design-system';



type Client = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
};

type ToastState = {
  type: 'success' | 'error';
  message: string;
  visible: boolean;
};


import { deleteUser, postUser, patchUser, fetchUsers } from './services/clientService';

export default function CustomersRoot({ onSelectClient, selectedCardIds: externalSelectedCardIds }: CustomersRootProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [inputPerPage, setInputPerPage] = useState('16');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>(externalSelectedCardIds || []);
  const [clientes, setClientes] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ type: 'success', message: '', visible: false });
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  };

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      try {
        const data = await fetchUsers(page, perPage);
        setClientes(data.clients);
        setTotal(data.totalPages);
      } catch (err) {
        setClientes([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, [page, perPage]);


  const handleSelect = (id: number) => {
    const client = clientes.find(c => c.id === id);
    if (client && onSelectClient) {
      onSelectClient(id, client);
      const prevIds = JSON.parse(sessionStorage.getItem('selectedClientIds') || '[]');
      let newIds;
      if (prevIds.includes(id)) {
        newIds = prevIds.filter((cardId: number) => cardId !== id);
      } else {
        newIds = [...prevIds, id];
      }
      sessionStorage.setItem('selectedClientIds', JSON.stringify(newIds));
    }
    setSelectedCardIds((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    setSelectedClient(null);
    setModalEditOpen(true);
  };

  const handleEdit = (client: Client) => {
    setModalEditOpen(true);
    setSelectedClient(client);
  };

  const handleDelete = (client: Client) => {
    setModalDeleteOpen(true);
    setSelectedClient(client);
  };

  const formatBRL = (value: number) =>
    value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="w-full h-full bg-zinc-50 flex flex-col px-2 sm:px-6 md:px-10 lg:px-[40px]" style={{ position: 'relative' }}>
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} visible={toast.visible} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      )}
      {loading ? (
        <LoaderSpinner visible={true} />
      ) : (
        <>
          <div className="flex-1 flex justify-center items-start">
            <div className="w-full mx-auto px-2 sm:px-6 md:px-10 lg:px-[60px]">
              <div className="rounded-lg w-full overflow-x-auto overflow-y-auto min-h-[60vh] px-2 sm:px-6 md:px-10 lg:px-[60px] py-5">
                <div className="flex justify-between items-center mb-[7px]">
                  <span className="text-base font-semibold text-zinc-900 pl-2">{clientes.length} clientes encontrados:</span>
                  <div className="flex items-center gap-2 pr-2">
                    <span className="text-base font-semibold text-zinc-900">Clientes por página:</span>
                    <div className="relative inline-block w-[80px]">
                      <input
                        type="number"
                        min={1}
                        className="border border-zinc-300 rounded px-2 py-1 text-base bg-white w-full pr-8 appearance-none no-arrows"
                        value={inputPerPage}
                        onChange={e => {
                          setInputPerPage(e.target.value);
                          if (e.target.value && Number(e.target.value) > 0) {
                            setPerPage(Number(e.target.value));
                          }
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        placeholder="Clientes/página"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {showSuggestions && (
                        <ul className="absolute left-0 top-full mt-1 bg-white border border-zinc-300 rounded shadow z-10 w-full">
                          {[8, 16, 32, 64].map(n => (
                            <li
                              key={n}
                              className="px-2 py-1 cursor-pointer hover:bg-zinc-100 text-base"
                              onMouseDown={() => {
                                setInputPerPage(String(n));
                                setPerPage(n);
                                setShowSuggestions(false);
                              }}
                            >{n}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-2">
                  {clientes.map((c) => {
                    return (
                      <Card
                        key={c.id}
                        title={c.name}
                        subtitle={`Salário: ${formatBRL(c.salary)}`}
                        description={`Empresa: ${formatBRL(c.companyValuation)}`}
                        onSelect={() => handleSelect(c.id)}
                        onEdit={() => handleEdit(c)}
                        onDelete={() => handleDelete(c)}
                        selected={selectedCardIds.includes(c.id)}
                      />
                    );
                  })}
                </div>
                <ButtonCreate className="w-full  mt-[15px] mb-[15px]  border border-[#EC6724] text-[#EC6724] bg-white rounded-[4px] font-medium" onClick={handleAdd}>
                  Criar cliente
                </ButtonCreate>
                <div className="flex justify-center items-center mt-2">
                  <nav className="flex gap-3 text-base">
                    {(() => {
                      const totalPages = total;
                      const pages: (number | string)[] = [];
                      if (totalPages <= 7) {
                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                      } else {
                        pages.push(1);
                        if (page > 4) pages.push('...');
                        for (let i = Math.max(2, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
                          pages.push(i);
                        }
                        if (page < totalPages - 3) pages.push('...');
                        pages.push(totalPages);
                      }
                      return pages.map((p, idx) =>
                        typeof p === 'number' ? (
                          <button
                            key={p}
                            className={`w-8 h-8 flex items-center justify-center rounded-[6px] font-semibold transition-colors ${page === p ? 'bg-[#EC6724] text-white' : 'bg-transparent text-zinc-900 hover:bg-zinc-100'}`}
                            style={{ boxShadow: page === p ? '0 2px 8px 0 rgba(236,103,36,0.10)' : undefined }}
                            onClick={() => setPage(p)}
                          >{p}</button>
                        ) : (
                          <span key={"ellipsis-" + idx} className="mx-1 text-zinc-700">...</span>
                        )
                      );
                    })()}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ModalClient
        open={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        onSubmit={async (data: { nome: string; salario: string; empresa: string }) => {
          setLoading(true);
          try {
            const toInt = (valor: string) => {
              if (!valor || valor.trim() === '') return undefined;
              const num = Number(valor.replace(/\./g, '').replace(',', '.'));
              return Math.round(num * 100);
            };

            if (selectedClient) {
              const patchPayload = {
                name: data.nome,
                salary: (() => {
                  const converted = data.salario && data.salario.trim() !== '' ? toInt(data.salario) : undefined;
                  return typeof converted === 'number' ? converted : selectedClient.salary;
                })(),
                companyValuation: (() => {
                  const converted = data.empresa && data.empresa.trim() !== '' ? toInt(data.empresa) : undefined;
                  return typeof converted === 'number' ? converted : selectedClient.companyValuation;
                })()
              };
              await patchUser(selectedClient.id, patchPayload);
              showToast('success', 'Cliente editado com sucesso!');
            } else {
              const payload: any = { name: data.nome };
              if (data.salario && data.salario.trim() !== '') {
                payload.salary = toInt(data.salario);
              }
              if (data.empresa && data.empresa.trim() !== '') {
                payload.companyValuation = toInt(data.empresa);
              }
              await postUser(payload);
              showToast('success', 'Cliente criado com sucesso!');
            }

            const usersData: { clients: Client[]; totalPages: number } = await fetchUsers(page, perPage);
            setClientes(usersData.clients);
            setTotal(usersData.totalPages);
            setModalEditOpen(false);
          } catch (err) {
            showToast('error', selectedClient ? 'Erro ao editar usuário!' : 'Erro ao criar usuário!');
          } finally {
            setLoading(false);
          }
        }}
        initialData={selectedClient ? {
          nome: selectedClient?.name ?? '',
          salario: selectedClient?.salary != null ? (selectedClient.salary / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/^R\$\s?/, '') : '',
          empresa: selectedClient?.companyValuation != null ? (selectedClient.companyValuation / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/^R\$\s?/, '') : '',
        } : undefined}
        title={selectedClient ? "Editar cliente:" : "Criar cliente:"}
        buttonText={selectedClient ? "Editar cliente" : "Criar cliente"}
      />
      <ModalDeleteClient
        open={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onDelete={async (): Promise<void> => {
          setLoading(true);
          try {
            if (selectedClient) {
              await deleteUser(selectedClient.id);
              showToast('success', 'Cliente excluído com sucesso!');
              const data = await fetchUsers(page, perPage);
              setClientes(data.clients);
              setTotal(data.totalPages * perPage);
            }
            setModalDeleteOpen(false);
          } catch (err) {
            showToast('error', 'Erro ao excluir usuário!');
            setModalDeleteOpen(false);
          } finally {
            setLoading(false);
          }
        }}
        clientName={selectedClient?.name ?? ''}
      />
    </div>
  );
}
