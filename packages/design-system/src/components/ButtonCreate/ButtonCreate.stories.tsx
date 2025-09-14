import type { Meta, StoryObj } from '@storybook/react';
import ButtonCreate from './ButtonCreate';

const meta: Meta<typeof ButtonCreate> = {
  title: 'Form/ButtonCreate',
  component: ButtonCreate,
};
export default meta;

type Story = StoryObj<typeof ButtonCreate>;

export const Default: Story = {
  render: () => <ButtonCreate />,
};

export const Disabled: Story = {
  render: () => <ButtonCreate disabled />,
};
