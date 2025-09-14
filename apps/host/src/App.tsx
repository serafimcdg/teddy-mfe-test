import * as React from 'react'
import { Header, Sidebar } from '@teddy/design-system'
// @ts-ignore
import CustomersRoot from 'clients/CustomersRoot'

import home from '/icons/home.svg'
import homeActive from '/icons/home-orange.svg'
import clients from '/icons/cliente.svg'
import clientsActive from '/icons/cliente-orange.svg'
import selected from '/icons/selecionados.svg'
import selectedActive from '/icons/selecionados-orange.svg'
import logo from '/icons/logoTeddy.svg'


type Key = 'home' | 'clients' | 'selected'

export default function App() {
  const [navHidden, setNavHidden] = React.useState(true)
  const [selectedKey, setSelectedKey] = React.useState<Key>('home')


  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onToggleNav={() => setNavHidden(false)}
        navHidden={navHidden}
        userName="João"
        navItems={[
          {
            key: 'clients',
            label: 'Clientes',
            href: '#clients',
            active: selectedKey === 'clients',
            onClick: (e) => {
              e.preventDefault();
              setSelectedKey('clients');
              setNavHidden(true);
            },
          },
          {
            key: 'selected',
            label: 'Clientes selecionados',
            href: '#selected',
            active: selectedKey === 'selected',
            onClick: (e) => {
              e.preventDefault();
              setSelectedKey('selected');
              setNavHidden(true);
            },
          },
          {
            key: 'sair',
            label: 'Sair',
            href: '#logout',
            onClick: (e) => {
              e.preventDefault();
            },
          },
        ]}
      />


      <Sidebar
        items={[
          { key: 'home', label: 'Home', iconSrc: home, iconActiveSrc: homeActive, href: '#home', active: selectedKey === 'home' },
          { key: 'clients', label: 'Clientes', iconSrc: clients, iconActiveSrc: clientsActive, href: '#clients', active: selectedKey === 'clients' },
          { key: 'selected', label: 'Clientes selecionados', iconSrc: selected, iconActiveSrc: selectedActive, href: '#selected', active: selectedKey === 'selected' },
        ]}
        hidden={navHidden}
        onHiddenChange={setNavHidden}
        onSelect={(key) => { setSelectedKey(key as Key); setNavHidden(true); }}
        activeColor="#EE7D46"
        logoSrc={logo}
      />
      <main >
        <CustomersRoot />
      </main>
    </div>
  )
}
