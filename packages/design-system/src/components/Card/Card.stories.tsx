import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'
const meta: Meta<typeof Card> = {
  title: 'Layout/Com Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'CArd de clientes, valores e boõtes de selecionar, editar e excluirt'
      }
    }
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Eduardo',
    subtitle: 'Salário: R$3.500,00',
    description: 'Empresa: R$120.000,00',
    actionsPosition: 'bottom-bar',
    selected: false,
  },
};
