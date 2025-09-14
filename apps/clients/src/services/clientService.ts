export async function deleteUser(id: number) {
  const response = await fetch(`https://boasorte.teddybackoffice.com.br/users/${id}`, {
    method: 'DELETE',
    headers: {
      'accept': '*/*'
    }
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir usuário');
  }
  return await response.text();
}

export async function postUser({ name, salary, companyValuation }: { name: string; salary: number; companyValuation: number }) {
  const response = await fetch('https://boasorte.teddybackoffice.com.br/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*'
    },
    body: JSON.stringify({ name, salary, companyValuation })
  });
  if (!response.ok) {
    throw new Error('Erro ao criar usuário');
  }
  return await response.json();
}

export async function patchUser(id: number, { name, salary, companyValuation }: { name: string; salary: number; companyValuation: number }) {
  const response = await fetch(`https://boasorte.teddybackoffice.com.br/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*'
    },
    body: JSON.stringify({ name, salary, companyValuation })
  });
  if (!response.ok) {
    throw new Error('Erro ao editar usuário');
  }
  return await response.json();
}

export async function fetchUsers(page: number, perPage: number) {
  const response = await fetch(`https://boasorte.teddybackoffice.com.br/users?page=${page}&limit=${perPage}`);
  if (!response.ok) throw new Error('Erro ao buscar clientes');
  return await response.json();
}
