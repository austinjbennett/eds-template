import { resolve } from 'path';
import type { UserConfig } from 'vite';

const reactDir = resolve(process.cwd());
const repoRoot = resolve(reactDir, '..');

const config = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(baseConfig: UserConfig) {
    return {
      ...baseConfig,
      server: {
        ...baseConfig.server,
        fs: {
          ...baseConfig.server?.fs,
          // Allow Storybook to import block CSS from the EDS root blocks/ folder.
          allow: [reactDir, repoRoot],
        },
      },
    };
  },
};

export default config;


