



import * as React from 'react';
import { Header, Sidebar } from '@teddy/design-system';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore
import CustomersRoot from 'clients/CustomersRoot';
// @ts-ignore
import SelectedClients from 'clients/SelectedClients';
import Login from './Login';




type Client = {
  nome: string;
  salario: string;
  empresa: string;
  id: number;
};


export default function App() {
  const [navHidden, setNavHidden] = React.useState(true);
  const [userName, setUserName] = React.useState<string>(() => localStorage.getItem('userName') || '');
  const [selectedClients, setSelectedClients] = React.useState<Client[]>([]);
  const location = useLocation();

  const handleSelectClient = (id: number, client: Client) => {
    setSelectedClients((prev) => prev.some((c) => c.id === id)
      ? prev.filter((c) => c.id !== id)
      : [...prev, client]);
  };
  const handleClearSelected = () => setSelectedClients([]);
  const handleLogout = () => {
    setUserName('');
    localStorage.removeItem('userName');
  };

  const navigate = useNavigate(); 

  // Helper for sidebar selection
  const getSidebarSelectedKey = () => {
    if (location.pathname === '/selecionados') return 'selected';
    if (location.pathname === '/clientes') return 'clients';
    return 'home';
  };

  // Helper for sidebar navigation
  const handleSidebarSelect = (key: 'home' | 'clients' | 'selected') => {
    if (key === 'home') navigate('/');
    else if (key === 'clients') navigate('/clientes');
    else if (key === 'selected') navigate('/selecionados');
  };

  return (
    <Routes>
      <Route path="/" element={
        <Login onEnter={(name: string) => {
          setUserName(name);
          localStorage.setItem('userName', name);
        }} />
      } />
      <Route path="/clientes" element={
        <div className="min-h-screen bg-gray-50">
          <Header
            onToggleNav={() => setNavHidden(false)}
            navHidden={navHidden}
            userName={userName}
            navItems={[
              { key: 'clients', label: 'Clientes', href: '/clientes', active: location.pathname === '/clientes', onClick: () => { navigate('/clientes'); } },
              { key: 'selected', label: 'Clientes selecionados', href: '/selecionados', active: location.pathname === '/selecionados', onClick: () => { navigate('/selecionados'); } },
              { key: 'sair', label: 'Sair', href: '/', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleLogout(); navigate('/'); } }
            ]}
          />
          <Sidebar
            items={[
              { key: 'home', label: 'Home', iconSrc: '/icons/home.svg', iconActiveSrc: '/icons/home-orange.svg', href: '/' },
              { key: 'clients', label: 'Clientes', iconSrc: '/icons/cliente.svg', iconActiveSrc: '/icons/cliente-orange.svg', href: '/clientes' },
              { key: 'selected', label: 'Clientes selecionados', iconSrc: '/icons/selecionados.svg', iconActiveSrc: '/icons/selecionados-orange.svg', href: '/selecionados' }
            ]}
            selectedKey={getSidebarSelectedKey()}
            hidden={navHidden}
            onHiddenChange={setNavHidden}
            onSelect={handleSidebarSelect}
            activeColor="#EE7D46"
            logoSrc={'/icons/logoTeddy.svg'}
          />
          <main>
            <CustomersRoot
              onSelectClient={handleSelectClient}
              selectedCardIds={selectedClients.map((c) => c.id)}
            />
          </main>
        </div>
      } />
      <Route path="/selecionados" element={
        <div className="min-h-screen bg-gray-50">
          <Header
            onToggleNav={() => setNavHidden(false)}
            navHidden={navHidden}
            userName={userName}
            navItems={[
              { key: 'clients', label: 'Clientes', href: '/clientes', active: location.pathname === '/clientes', onClick: () => { navigate('/clientes'); } },
              { key: 'selected', label: 'Clientes selecionados', href: '/selecionados', active: location.pathname === '/selecionados', onClick: () => { navigate('/selecionados'); } },
              { key: 'sair', label: 'Sair', href: '/', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleLogout(); navigate('/'); } }
            ]}
          />
          <Sidebar
            items={[
              { key: 'home', label: 'Home', iconSrc: '/icons/home.svg', iconActiveSrc: '/icons/home-orange.svg', href: '/' },
              { key: 'clients', label: 'Clientes', iconSrc: '/icons/cliente.svg', iconActiveSrc: '/icons/cliente-orange.svg', href: '/clientes' },
              { key: 'selected', label: 'Clientes selecionados', iconSrc: '/icons/selecionados.svg', iconActiveSrc: '/icons/selecionados-orange.svg', href: '/selecionados' }
            ]}
            selectedKey={getSidebarSelectedKey()}
            hidden={navHidden}
            onHiddenChange={setNavHidden}
            onSelect={handleSidebarSelect}
            activeColor="#EE7D46"
            logoSrc={'/icons/logoTeddy.svg'}
          />
          <main>
            <SelectedClients
              selectedClients={selectedClients}
              onClear={handleClearSelected}
            />
          </main>
        </div>
      } />
    </Routes>
  );
}

