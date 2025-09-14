import { useState } from 'react';
import { Card, ButtonCreate, ModalClient } from '@teddy/design-system';

export default function CustomersRoot() {
  const [modalOpen, setModalOpen] = useState(false);
  const clientes = Array.from({ length: 16 }, (_, i) => ({
    nome: 'Eduardo',
    salario: 'R$3.500,00',
    empresa: 'R$120.000,00',
    id: i,
  }));

  return (
  <div className="w-full h-full bg-zinc-50 flex flex-col">
      <div className="flex-1 flex justify-center items-start">
        <div className="w-full px-6">
          <div className="bg-[#f6f6f6] rounded-lg p-4 w-full overflow-x-auto max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-4 gap-8 w-full mb-8">
              {clientes.map((c) => (
                <Card key={c.id} title={c.nome} subtitle={`Salário: ${c.salario}`} description={`Empresa: ${c.empresa}`} />
              ))}
            </div>
            <ButtonCreate className="w-full mb-2" onClick={() => setModalOpen(true)}>
              Criar cliente
            </ButtonCreate>
          </div>
        </div>
      </div>
      <ModalClient open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={() => setModalOpen(false)} />
    </div>
  );
}
