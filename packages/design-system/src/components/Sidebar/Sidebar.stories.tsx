import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Sidebar, { type SidebarItem } from './Sidebar'

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onSelect: { action: 'select' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof Sidebar>

const items: SidebarItem[] = [
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

const Template: Story['render'] = (args) => {
  const [selectedKey, setSelectedKey] = React.useState(args.selectedKey ?? 'home')
  const [hidden, setHidden] = React.useState(!!args.hidden)

  return (
    <div className="h-[560px] flex overflow-hidden">
      <Sidebar
        {...args}
        items={items}
        selectedKey={selectedKey}
        hidden={hidden}
        onHiddenChange={setHidden}
        onSelect={(key, item, ev) => {
          setSelectedKey(key)
          args.onSelect?.(key, item, ev)
        }}
      />

      <div className="flex-1 p-6">
      Demais telas
      </div>
    </div>
  )
}

export const Expanded: Story = {
  args: {
    items,
    logoSrc: '/icons/logoTeddy.svg',
    selectedKey: 'home',
    activeColor: '#EE7D46',
    hidden: false,
    collapseIconSrc: '/icons/collapse-buttoon.svg',
  },
  render: Template,
}
