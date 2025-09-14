import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Card from './Card'
import Header, { type HeaderNavItem } from '../Header/Header'
import Sidebar, { type SidebarItem } from '../Sidebar/Sidebar'

const meta = {
  title: 'Layout/Com Card',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Interactive: Story = {
  render: () => {
    const [hidden, setHidden] = React.useState(false)
    const [selected, setSelected] = React.useState('clients')

    const items: SidebarItem[] = [
      { key: 'home',     label: 'Home',                  iconSrc: '/icons/home.svg',         iconActiveSrc: '/icons/home-orange.svg',         href: '#' },
      { key: 'clients',  label: 'Clientes',              iconSrc: '/icons/cliente.svg',      iconActiveSrc: '/icons/cliente-orange.svg',      href: '#' },
      { key: 'selected', label: 'Clientes selecionados', iconSrc: '/icons/selecionados.svg', iconActiveSrc: '/icons/selecionados-orange.svg', href: '#' },
    ]

    const topNav: HeaderNavItem[] = [
      { key: 'clients',  label: 'Clientes',              active: selected === 'clients',  onClick: () => setSelected('clients') },
      { key: 'selected', label: 'Clientes selecionados', active: selected === 'selected', onClick: () => setSelected('selected') },
      { key: 'logout',   label: 'Sair',                  onClick: (e) => { e.preventDefault() } },
    ]

    return (
      <div className="min-h-screen flex bg-zinc-50">
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

          <main className="p-6">
            <div className="mt-[163px] ml-[120px]">
              <div className="grid grid-cols-4 gap-8 w-full">
                {[...Array(16)].map((_, i) => (
                  <Card
                    key={i}
                    title={`Eduardo ${i+1}`}
                    subtitle="Salário: R$3.500,00"
                    description="Empresa: R$120.000,00"
                    actionsPosition="bottom-bar"
                    onAdd={() => console.log(`[Card ${i+1}] add`)}
                    onEdit={() => console.log(`[Card ${i+1}] edit`)}
                    onDelete={() => console.log(`[Card ${i+1}] delete`)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  },
}
