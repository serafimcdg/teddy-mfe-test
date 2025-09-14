import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toast de retorno ao usuario'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operação realizada com sucesso!',
    visible: true,
    onClose: () => alert('Fechar'),
  },
};

export const ToastError: Story = {
  args: {
    type: 'error',
    message: 'Ocorreu um erro.',
    visible: true,
    onClose: () => alert('Fechar'),
  },
};
