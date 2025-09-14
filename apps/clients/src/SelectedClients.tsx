


import { useEffect, useState } from 'react';
import { LoaderSpinner, ButtonCreate, SelectedCard } from '@teddy/design-system';

export default function SelectedClients({ onClear }: { onClear: () => void }) {
  const [selectedClients, setSelectedClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchSelectedClients = async () => {
    setLoading(true);
    try {
      const ids = JSON.parse(sessionStorage.getItem('selectedClientIds') || '[]');
      if (ids.length > 0) {
        const promises = ids.map((id: number) =>
          fetch(`https://boasorte.teddybackoffice.com.br/users/${id}`)
            .then(res => res.ok ? res.json() : null)
        );
        const results = await Promise.all(promises);
        setSelectedClients(results.filter(Boolean));
      } else {
        setSelectedClients([]);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSelectedClients();
  }, []);

  return (
    <div className="w-full h-full bg-zinc-50 flex flex-col px-2 sm:px-6 md:px-10 lg:px-[40px]" style={{ position: 'relative' }}>
      {loading ? (
        <LoaderSpinner visible={true} />
      ) : (
        <div className="flex-1 flex justify-center items-start">
          <div className="w-full mx-auto px-2 sm:px-6 md:px-10 lg:px-[60px]">
            <div className="rounded-lg w-full overflow-x-auto min-h-[60vh] px-2 sm:px-6 md:px-10 lg:px-[60px] py-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-zinc-900 pl-2">Clientes selecionados:</span>
              </div>
              <div className="w-full mb-8">
                {selectedClients.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {selectedClients.map((c) => (
                      <SelectedCard
                        key={c.id}
                        nome={c.name}
                        salario={c.salary?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        empresa={c.companyValuation?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        onDelete={() => {
                          const ids = JSON.parse(sessionStorage.getItem('selectedClientIds') || '[]');
                          const newIds = ids.filter((id: number) => id !== c.id);
                          sessionStorage.setItem('selectedClientIds', JSON.stringify(newIds));
                          onClear?.();
                          fetchSelectedClients();
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center py-16">
                    <span className="text-zinc-500 text-lg">Nenhum cliente selecionado.</span>
                  </div>
                )}
              </div>
              <ButtonCreate
                className="w-full mt-[15px] mb-[15px] border border-[#EC6724] text-[#EC6724] bg-white rounded-[4px] font-medium"
                onClick={() => {
                  sessionStorage.removeItem('selectedClientIds');
                  onClear?.();
                  setSelectedClients([]);
                }}
              >
                Limpar clientes selecionados
              </ButtonCreate>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
