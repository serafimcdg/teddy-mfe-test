import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
   staticDirs: [
    { from: '../src/icons', to: '/icons' }
  ],
  docs: { autodocs: 'tag' },
  viteFinal: async (cfg) => {
    cfg.base = './';
    return cfg
  }
}
export default config
