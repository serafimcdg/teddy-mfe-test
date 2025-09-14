import type { Meta, StoryObj } from '@storybook/react';
import ModalDeleteClient from './ModalDeleteClient';

const meta: Meta<typeof ModalDeleteClient> = {
  title: 'Form/ModalDeleteClient',
  component: ModalDeleteClient,
};
export default meta;

type Story = StoryObj<typeof ModalDeleteClient>;

export const Default: Story = {
  render: () => (
    <ModalDeleteClient open onClose={() => {}} onDelete={() => {}} clientName="Eduardo" />
  ),
};
