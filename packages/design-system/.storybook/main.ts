import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  docs: { autodocs: 'tag' },
  viteFinal: async (cfg) => {
    cfg.base = './';
    return cfg
  }
}
export default config
