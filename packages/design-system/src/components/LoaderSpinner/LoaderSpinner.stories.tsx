import type { Meta, StoryObj } from '@storybook/react';
import LoaderSpinner from './LoaderSpinner';

const meta: Meta<typeof LoaderSpinner> = {
  title: 'Components/LoaderSpinner',
  component: LoaderSpinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Loader de requisição'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof LoaderSpinner>;

export const Default: Story = {
  args: {
    visible: true,
    timeout: 2000,
  },
};
