import { configure } from '@storybook/angular';

// automatically import all files ending in *.stories.ts
configure(require.context('../apps/bootcamp-client/src/stories', true, /\.stories\.ts$/), module);
