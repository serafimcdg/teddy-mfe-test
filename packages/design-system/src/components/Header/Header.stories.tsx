import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header'
import Sidebar from '../Sidebar/Sidebar'

const meta: Meta<typeof Header> = {
  title: 'Header e Sidebar',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header de toda a aplicação'
      }
    }
  },
};

export default meta
type Story = StoryObj

export const Interactive: Story = {
  render: () => {
    const [hidden, setHidden] = React.useState(false)
    const [selected, setSelected] = React.useState('clients')

  const items = [
      {
        key: 'home',
        label: 'Home',
        iconSrc: '/icons/home.svg',
        iconActiveSrc: '/icons/home-orange.svg',
        href: '#',
      },
      {
        key: 'clients',
        label: 'Clientes',
        iconSrc: '/icons/cliente.svg',
        iconActiveSrc: '/icons/cliente-orange.svg',
        href: '#',
      },
      {
        key: 'selected',
        label: 'Clientes selecionados',
        iconSrc: '/icons/selecionados.svg',
        iconActiveSrc: '/icons/selecionados-orange.svg',
        href: '#',
      },
    ]

  interface TopNavItemBase {
    key: string;
    label: string;
    onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  }

  interface TopNavItemWithActive extends TopNavItemBase {
    active: boolean;
  }

  type TopNavItem = TopNavItemBase | TopNavItemWithActive;

  const topNav: TopNavItem[] = [
    {
      key: 'clients',
      label: 'Clientes',
      active: selected === 'clients',
      onClick: () => setSelected('clients'),
    },
    {
      key: 'selected',
      label: 'Clientes selecionados',
      active: selected === 'selected',
      onClick: () => setSelected('selected'),
    },
    {
      key: 'logout',
      label: 'Sair',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];

    return (
      <div className="min-h-screen flex bg-white">
        <Sidebar
          items={items}
          logoSrc="/icons/logoTeddy.svg"
          selectedKey={selected}
          onSelect={(key) => setSelected(key)}
          hidden={hidden}
          onHiddenChange={setHidden}
          collapseIconSrc="/icons/collapse-buttoon.svg"
          activeColor="#EE7D46"
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            logoSrc="/icons/logoTeddy.svg"
            hamburgerIconSrc="/icons/hamburguer.svg"
            navHidden={hidden}
            onToggleNav={() => setHidden(v => !v)}
            navItems={topNav}
            userName="Usuário"
          />

          <main className="p-6 space-y-3 text-zinc-700">
            Outros componentes
          </main>
        </div>
      </div>
    )
  },
}
