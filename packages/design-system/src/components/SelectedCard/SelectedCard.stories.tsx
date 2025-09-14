import type { Meta, StoryObj } from '@storybook/react';
import SelectedCard from './SelectedCard';

const meta: Meta<typeof SelectedCard> = {
  title: 'Components/SelectedCard',
  component: SelectedCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'SelectedCard exibe informações de um cliente selecionado e permite remoção.'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof SelectedCard>;

export const Default: Story = {
  args: {
    nome: 'João Silva',
    salario: 'R$ 5.000',
    empresa: 'Teddy',
    onDelete: () => alert('Remover'),
  },
};
