import type { Meta, StoryObj } from '@storybook/react';
import ModalClient from './ModalClient';

const meta: Meta<typeof ModalClient> = {
  title: 'Form/ModalClient',
  component: ModalClient,
};
export default meta;

type Story = StoryObj<typeof ModalClient>;

export const Default: Story = {
  render: () => (
    <ModalClient open onClose={() => {}} onSubmit={console.log} />
  ),
};
